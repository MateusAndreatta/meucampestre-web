import React, { useRef, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import EditIcon from '../../components/icons/editIcon';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import SessionData from '../../utils/sessionData';
import { maskCpfCnpj, maskPhone } from '../../mask';
import MyAccountRepository from '../../repository/MyAccountRepository';
import Toaster from '../../utils/ui/toaster';
import Button from '../../components/buttons/button';

export default function Profile() {
  const user = SessionData.getUser();
  console.log(user);

  const [txtName, setTxtName] = useState(user.nome);
  const [txtEmail, setTxtEmail] = useState(user.email);
  const [txtPhone, setTxtPhone] = useState(maskPhone(user.telefone));
  const [txtDocument, setTxtDocument] = useState(maskCpfCnpj(user.documento));

  const inputFile = useRef(null);
  const [img, setImg] = useState();
  const [loadingButton, setLoadingButton] = useState(false);

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
    setTxtPhone(maskPhone(value));
  }

  function handleDocumentChange(event) {
    const value = event.target.value;
    setTxtDocument(value);
  }

  const onButtonClick = () => {
    setLoadingButton(true);
    if (img) {
      sendFileFirebase(img);
    } else {
      sendDataToDatabase(user.imagemUrl);
    }
  };

  function onPicEditClick() {
    inputFile.current.click();
  }

  function sendDataToDatabase(imageLink) {
    MyAccountRepository.update({
      nome: txtName,
      email: txtEmail,
      telefone: txtPhone,
      imagemUrl: imageLink,
    })
      .then((response) => {
        console.log(user);
        let newUser = { ...user };
        Toaster.showInfo('Conta atualizada');
        newUser.nome = txtName;
        newUser.email = txtEmail;
        newUser.telefone = txtPhone;
        newUser.imagemUrl = imageLink;
        console.log(newUser);
        SessionData.setUser(newUser);
      })
      .catch((error) => {
        if (error.response.data.message) {
          Toaster.showError(error.response.data.message);
        } else {
          Toaster.showError('Ops, ocorreu um erro, tente novamente mais tarde');
        }
      })
      .finally(() => {
        setLoadingButton(false);
      });
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
      `images/profile/${btoa(`profile_${user.id}_MeuCampestre`)}.jpg` //TODO: Concatenar o id do usuário
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
          sendDataToDatabase(downloadURL);
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
                  : user.imagemUrl
                  ? user.imagemUrl
                  : `https://ui-avatars.com/api/?name=${user.nome}`
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
              label="Documento"
              type="text"
              required={true}
              disabled={true}
              onChange={handleDocumentChange}
            />
          </div>
        </form>
        <div className=" flex flex-row-reverse">
          <Button loading={loadingButton} onClick={onButtonClick}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
