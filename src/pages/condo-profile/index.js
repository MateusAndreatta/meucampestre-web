import React, { useRef, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import EditIcon from '../../components/icons/editIcon';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import MeuCampestreLogo from '../../resources/MeuCampestreLogo.svg';
import SessionData from '../../utils/sessionData';
import CondoRepository from '../../repository/CondoRepository';
import Toaster from '../../utils/ui/toaster';

export default function CondoProfile() {
  const [txtName, setTxtName] = useState('');
  const [txtEmail, setTxtEmail] = useState('');
  const [txtDescription, setTxtDescription] = useState('');
  const [txtDocument, setTxtDocument] = useState('');
  const [txtAddress, setTxtAddress] = useState('');

  const condo = SessionData.getCondo();

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

  function handleDescriptionChange(event) {
    const value = event.target.value;
    setTxtDescription(value);
  }

  function handleDocumentChange(event) {
    const value = event.target.value;
    setTxtDocument(value);
  }

  function handleAddressChange(event) {
    const value = event.target.value;
    setTxtAddress(value);
  }

  const onButtonClick = () => {
    if (img) {
      sendFileFirebase(img);
    } else {
      sendDataToDatabase({
        nome: txtName,
        descricao: txtDescription,
        email: txtEmail,
        endereco: txtAddress,
        image_url: condo.image_url,
      });
    }
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
      `images/condo/profile/${btoa(`profile_${condo.id}_MeuCampestre`)}.jpg`
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
          sendDataToDatabase({
            nome: txtName,
            descricao: txtDescription,
            email: txtEmail,
            endereco: txtAddress,
            image_url: downloadURL,
          });
        });
      }
    );
  }

  function sendDataToDatabase(data) {
    CondoRepository.update(data)
      .then((response) => {
        Toaster.showInfo('Informações foram salvas!');
        // atualizar os dados da variavel condo e depois fazer o set dele lá no SessionData
      })
      .catch((error) => {
        console.log(error);

        if (error.response.data.mensagem) {
          Toaster.showError(error.response.data.mensagem);
        } else {
          Toaster.showError('Ops, ocorreu um erro, tente novamente mais tarde');
        }
      });
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className=" my-8 text-2xl">Perfil condomínio</h1>

        <div className="mb-4 flex justify-center">
          <div className="relative">
            <img
              alt="Perfil"
              src={img ? URL.createObjectURL(img) : MeuCampestreLogo}
              className="h-32 w-auto max-w-full cursor-pointer bg-transparent object-contain md:h-48 lg:h-64"
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
              label="Nome"
              type="text"
              required={true}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-2">
            <InputField
              name="txtDescription"
              value={txtDescription}
              label="Descrição"
              type="text"
              required={true}
              onChange={handleDescriptionChange}
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
              name="txtAddress"
              value={txtAddress}
              label="Endereço"
              type="text"
              required={true}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-2">
            <InputField
              name="txtDocument"
              value={txtDocument}
              label="Documento"
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
