import React, { useRef, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import EditIcon from '../../components/icons/editIcon';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function Profile() {
  const [txtName, setTxtName] = useState('');
  const [txtEmail, setTxtEmail] = useState('');
  const [txtPhone, setTxtPhone] = useState('');
  const [txtDocument, setTxtDocument] = useState('');

  const inputFile = useRef(null);
  const [img, setImg] = useState();

  function handleNameChange(event) {
    const value = event.target.value;
    setTxtName(value);
  }

  function handleEmailChange(event) {
    const value = event.target.value;
    setTxtEmail(value);
  }

  function handlePhoneChange(event) {
    const value = event.target.value;
    setTxtPhone(value);
  }

  function handleDocumentChange(event) {
    const value = event.target.value;
    setTxtDocument(value);
  }

  const onButtonClick = () => {
    sendFileFirebase(img);
  };

  function onPicEditClick() {
    inputFile.current.click();
  }

  const onImageChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      setImg(file);
    }
  };

  function sendFileFirebase(file) {
    const storageRef = ref(
      storage,
      `images/profile/${new Date().getMilliseconds()}.jpg` //TODO: Concatenar o id do usuário
    );

    const metadata = {
      contentType: file.type,
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error.code);
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className=" my-8 text-2xl">Meu perfil</h1>

        <div className="mb-4 flex justify-center">
          <div className="relative">
            <img
              alt="Perfil"
              src={
                img
                  ? URL.createObjectURL(img)
                  : 'https://via.placeholder.com/150'
              } //TODO ADD FALBACK INITIALS
              className="h-32 w-32 cursor-pointer rounded-full bg-gray-500 object-cover md:h-48 md:w-48 lg:h-64 lg:w-64"
            />
            <div
              className="absolute right-1 bottom-0 h-10 w-10 cursor-pointer rounded-full border-2 border-gray-100 bg-white shadow lg:h-14 lg:w-14"
              onClick={onPicEditClick}>
              <div className="flex h-full items-center justify-center">
                <EditIcon color="" />
              </div>
            </div>
          </div>
        </div>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: 'none' }}
          accept="image/png, image/jpeg"
          onChange={onImageChange}
        />
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mb-2">
            <InputField
              name="txtName"
              value={txtName}
              label="Nome completo"
              type="text"
              required={true}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-2">
            <InputField
              name="txtEmail"
              value={txtEmail}
              label="E-mail"
              type="email"
              errorLabel="O e-mail informado não é válido"
              required={true}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-2">
            <InputField
              name="txtPhone"
              value={txtPhone}
              label="Telefone"
              type="tel"
              required={true}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="mb-2">
            <InputField
              name="txtDocument"
              value={txtDocument}
              label="CPF"
              type="text"
              required={true}
              onChange={handleDocumentChange}
            />
          </div>
        </form>
        <div className=" flex flex-row-reverse">
          <button className="btn-outline" onClick={onButtonClick}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
