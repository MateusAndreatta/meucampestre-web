import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import Button from '../../components/buttons/button';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import SessionData from '../../utils/sessionData';
import BannerRepository from '../../repository/BannerRepository';
import MapaRepository from '../../repository/MapaRepository';

export default function NewMap(props) {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [img, setImg] = useState();
  const condo = SessionData.getCondo();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      MapaRepository.findAll().then((response) => {
        if (response.urlMapa) {
          setData(response);
          setEditMode(true);
        }
      });
    } catch (error) {}
  }, []);

  function handleSubmit() {
    if (img) {
      setLoadingButton(true);
      sendFileFirebase(img);
    } else {
      if (editMode) {
        sendDataToDatabase(data.urlMapa);
      } else {
        Toaster.showInfo('É necessário preencher uma imagem');
      }
    }
  }

  const handleClickDelete = () => {
    MapaRepository.remove().then(() => {
      Toaster.showInfo('Mapa removido com sucesso');
      navigate('/home');
    });
  };

  const onImageChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      setImg(file);
    }
  };

  function sendFileFirebase(file) {
    const storageRef = ref(
      storage,
      `images/mapas/${btoa(`condo_${condo.id}_${new Date().getTime()}`)}.jpg`
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
    if (editMode) {
      MapaRepository.update({
        urlMapa: imageLink,
      })
        .then((response) => {
          Toaster.showInfo('Mapa atualizado com sucesso');
          navigate('/home');
        })
        .finally(() => {
          setLoadingButton(false);
        });
    } else {
      MapaRepository.create({
        urlMapa: imageLink,
      })
        .then((response) => {
          Toaster.showInfo('Mapa criado com sucesso');
          navigate('/home');
        })
        .finally(() => {
          setLoadingButton(false);
        });
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Gerenciar mapa</h1>
          <div className="flex gap-2">
            {editMode && (
              <Button className="btn-outline" onClick={handleClickDelete}>
                Deletar
              </Button>
            )}
            <Link to="/home">
              <Button className="btn-outline">Voltar</Button>
            </Link>
          </div>
        </div>
        <div>
          <form className="grid grid-cols-1 gap-4 ">
            <div className="flex justify-center">
              <img
                src={
                  img ? URL.createObjectURL(img) : editMode ? data.urlMapa : ''
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
