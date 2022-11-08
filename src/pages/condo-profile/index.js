import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import EditIcon from '../../components/icons/editIcon';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import MeuCampestreLogo from '../../resources/MeuCampestreLogo.svg';
import SessionData from '../../utils/sessionData';
import CondoRepository from '../../repository/CondoRepository';
import Toaster from '../../utils/ui/toaster';
import { maskCpfCnpj } from '../../mask';
import { ROLES } from '../../utils/Constants';
import Button from '../../components/buttons/button';
import Translator from '../../components/i18n/Translator';

export default function CondoProfile() {
  const [txtName, setTxtName] = useState('');
  const [txtEmail, setTxtEmail] = useState('');
  const [txtDescription, setTxtDescription] = useState('');
  const [txtDocument, setTxtDocument] = useState('');
  const [txtAddress, setTxtAddress] = useState('');

  const [loadingButton, setLoadingButton] = useState(false);

  const condo = SessionData.getCondo();
  const roles = SessionData.getRoles();

  const inputFile = useRef(null);
  const [img, setImg] = useState();
  const [imgLink, setImgLink] = useState();
  const [editEnabled, setEditEnabled] = useState(roles.includes(ROLES.SINDICO));

  // TODO: Não tem necessidade de fazer esse request, em tese todos os dados do condo já estão no navegador
  useEffect(() => {
    CondoRepository.findById(condo.id).then((response) => {
      console.log(response);
      setTxtName(response.nome);
      setTxtEmail(response.email);
      setTxtDocument(maskCpfCnpj(response.documento));
      setTxtDescription(response.descricao);
      setTxtAddress(response.endereco);
      setImgLink(response.imagemUrl);
    });
  }, []);

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
    setLoadingButton(true);
    if (editEnabled) {
      if (img) {
        sendFileFirebase(img);
      } else {
        const documento = txtDocument.replace(/[^\d]+/g, '');
        sendDataToDatabase({
          nome: txtName,
          descricao: txtDescription,
          email: txtEmail,
          endereco: txtAddress,
          documento: documento,
          imagemUrl: imgLink,
        });
      }
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
          setImgLink(downloadURL);
          const documento = txtDocument.replace(/[^\d]+/g, '');
          sendDataToDatabase({
            nome: txtName,
            descricao: txtDescription,
            email: txtEmail,
            endereco: txtAddress,
            documento: documento,
            imagemUrl: downloadURL,
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

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className=" my-8 text-2xl">
          <Translator path="condoProfile.title" />
        </h1>

        <div className="mb-4 flex justify-center">
          <div className="relative">
            <img
              alt="Perfil"
              src={
                img
                  ? URL.createObjectURL(img)
                  : imgLink
                  ? imgLink
                  : MeuCampestreLogo
              }
              className="h-32 w-auto max-w-full cursor-pointer bg-transparent object-contain md:h-48 lg:h-64"
            />
            <div
              className={` ${
                !editEnabled ? 'hidden' : ''
              } absolute right-1 bottom-0 h-10 w-10 cursor-pointer rounded-full border-2 border-gray-100 bg-white shadow lg:h-14 lg:w-14`}
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
              label={<Translator path="condoProfile.form.name" />}
              type="text"
              required={true}
              disabled={!editEnabled}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-2">
            <InputField
              name="txtDescription"
              value={txtDescription}
              label={<Translator path="condoProfile.form.description" />}
              type="text"
              required={true}
              disabled={!editEnabled}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="mb-2">
            <InputField
              name="txtEmail"
              value={txtEmail}
              label={<Translator path="condoProfile.form.email" />}
              type="email"
              errorLabel={<Translator path="condoProfile.form.emailError" />}
              required={true}
              disabled={!editEnabled}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-2">
            <InputField
              name="txtAddress"
              value={txtAddress}
              label={<Translator path="condoProfile.form.address" />}
              type="text"
              required={true}
              disabled={!editEnabled}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-2">
            <InputField
              name="txtDocument"
              value={txtDocument}
              label={<Translator path="condoProfile.form.document" />}
              type="text"
              required={true}
              disabled={true}
              onChange={handleDocumentChange}
            />
          </div>
        </form>
        <div
          className={`mb-5 flex flex-row-reverse ${
            !editEnabled ? 'hidden' : ''
          }`}>
          <Button onClick={onButtonClick} loading={loadingButton}>
            <Translator path="condoProfile.form.button" />
          </Button>
        </div>
      </div>
    </div>
  );
}
