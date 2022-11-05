import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import { useLocation, useNavigate } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import Button from '../../components/buttons/button';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import SessionData from '../../utils/sessionData';
import CommunAreaRepository from '../../repository/CommunAreaRepository';
import CheckboxField from '../../components/fields/checkboxField';

export default function NewCommunArea() {
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [ativo, setAtivo] = useState(true);
  const [txtTitle, setTxtTitle] = useState('');
  const [txtDescription, setTxtDescription] = useState('');
  const [img, setImg] = useState();
  const condo = SessionData.getCondo();

  useEffect(() => {
    if (location.state) {
      setEditMode(true);
      setTxtTitle(location.state.data.titulo);
      setTxtDescription(location.state.data.descricao);
      setAtivo(location.state.data.ativo);
    }
  }, [editMode]);

  function handleTitleChange(event) {
    const value = event.target.value;
    setTxtTitle(value);
  }

  function handleDescriptionChange(event) {
    const value = event.target.value;
    setTxtDescription(value);
  }

  function handleChangeCheckbox() {
    setAtivo(!ativo);
  }

  const navigate = useNavigate();

  function handleSubmit() {
    if (txtTitle.length < 1 || (!img && !editMode)) {
      Toaster.showInfo('É necessário informar todos os campos obrigátorios');
      return;
    }
    setLoadingButton(true);
    if (img) {
      sendFileFirebase(img);
    } else {
      sendDataToDatabase();
    }
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
      `images/commun-area/${btoa(
        `condo_${condo.id}_${new Date().getTime()}`
      )}.jpg`
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

  function sendDataToDatabase(imageLink) {
    if (!editMode) {
      CommunAreaRepository.create({
        titulo: txtTitle,
        descricao: txtDescription,
        urlFoto: imageLink,
      })
        .then((response) => {
          Toaster.showInfo('Área comum criada com sucesso');
          navigate('/areas-comuns');
        })
        .finally(() => {
          setLoadingButton(false);
        });
    } else {
      CommunAreaRepository.update(
        {
          titulo: txtTitle,
          descricao: txtDescription,
          urlFoto: imageLink || location.state.data.urlFoto,
          ativo: ativo,
        },
        location.state.data.id
      )
        .then((response) => {
          Toaster.showInfo('Alterações salvas com sucesso');
          navigate('/areas-comuns');
        })
        .finally(() => {
          setLoadingButton(false);
        });
    }
  }

  const handleClickDelete = () => {
    CommunAreaRepository.remove(location.state.data.id).then(() => {
      Toaster.showInfo('Área comum removida com sucesso');
      navigate('/areas-comuns');
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">
            {editMode ? 'Editar área comum' : 'Nova área comum'}
          </h1>
          {editMode && (
            <Button className="btn-outline" onClick={handleClickDelete}>
              Deletar
            </Button>
          )}
        </div>
        <div>
          <form className="grid grid-cols-1 gap-4 ">
            <div className="flex justify-center">
              <img
                src={
                  img
                    ? URL.createObjectURL(img)
                    : editMode
                    ? location.state.data.urlFoto
                    : ''
                }
                className="w-full max-w-md rounded"
              />
            </div>

            <div className="mb-2">
              <label className={`required text-sm font-medium text-slate-700`}>
                Imagem
              </label>
              <input
                type="file"
                id="file"
                className="input w-full"
                accept="image/png, image/jpeg"
                onChange={onImageChange}
              />
            </div>

            <div className="mb-2">
              <InputField
                name="txtTitle"
                value={txtTitle}
                label="Título"
                type="text"
                required={true}
                onChange={handleTitleChange}
              />
            </div>

            <div className="mb-2">
              <InputField
                name="txtDescription"
                value={txtDescription}
                label="Descrição"
                type="text"
                required={false}
                onChange={handleDescriptionChange}
              />
            </div>
            {editMode && (
              <CheckboxField
                label="disponível para reservas"
                checked={ativo}
                onChange={handleChangeCheckbox}
              />
            )}
          </form>

          <div className="my-2 flex flex-row-reverse">
            <Button loading={loadingButton} onClick={handleSubmit}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
