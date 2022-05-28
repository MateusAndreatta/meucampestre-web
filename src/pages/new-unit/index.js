import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import axios from 'axios';
import { API_ENDPOINT } from '../../globals';
import { useNavigate, useParams } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import SessionData from '../../utils/sessionData';

function sendDataToApi(token, data) {
  return axios({
    method: 'POST',
    url: `${API_ENDPOINT}/usuarios/1/usuario`,
    params: {},
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function updateUserApi(token, data) {
  return axios({
    method: 'PUT',
    url: `${API_ENDPOINT}/usuarios/1/usuario`,
    params: {},
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//TODO: Colocar parametro dinamico
function getDataFromApi(token, documento) {
  return axios({
    method: 'GET',
    url: `${API_ENDPOINT}/usuarios/1/usuario/${documento}`,
    params: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function NewUnit() {
  let { documento } = useParams();
  const [editMode, setEditMode] = useState(!!documento);

  const [txtTitle, setTxtTitle] = useState('');
  const [txtAddress, setTxtAddress] = useState('');
  const [txtDescription, setTxtDescription] = useState('');
  const [txtCoordinates, setTxtCoordinates] = useState('');

  useEffect(() => {
    if (editMode) {
      getDataFromApi(token, documento).then((response) => {
        setTxtTitle(response.data.titulo);
        setTxtAddress(response.data.endereco);
        setTxtDescription(response.data.descricao);
        setTxtCoordinates(response.data.coordenadas);
      });
    }
  }, [editMode]);

  const token = SessionData.getToken();

  function handleTitleChange(event) {
    const value = event.target.value;
    setTxtTitle(value);
  }

  function handleAddressChange(event) {
    const value = event.target.value;
    setTxtAddress(value);
  }

  function handleDescriptionChange(event) {
    const value = event.target.value;
    setTxtDescription(value);
  }

  function handleCoordinatesChange(event) {
    const value = event.target.value;
    setTxtCoordinates(value);
  }

  const navigate = useNavigate();

  function handleSubmit() {
    if (txtTitle.length < 1) {
      Toaster.showInfo('É necessário informar o titulo');
      return;
    }

    if (editMode) {
      updateUserApi(token, {
        titulo: txtTitle,
        endereco: txtAddress,
        descricao: txtDescription,
        coordenadas: txtCoordinates,
      })
        .then((response) => {
          console.log(response);
          Toaster.showSuccess('Unidade editada!');
          navigate('/unidades');
        })
        .catch((error) => {
          Toaster.showError(error.response.data.mensagem);
        });
    } else {
      sendDataToApi(token, {
        titulo: txtTitle,
        endereco: txtAddress,
        descricao: txtDescription,
        coordenadas: txtCoordinates,
      })
        .then((response) => {
          console.log(response);
          Toaster.showSuccess('Nova unidade criada!');
          navigate('/unidades');
        })
        .catch((error) => {
          Toaster.showError(error.response.data.mensagem);
        });
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="my-8 text-2xl">
          {editMode ? 'Editar unidade' : 'Nova unidade'}
        </h1>
        <div>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-1">
            <div className="mb-2">
              <InputField
                name="txtTitle"
                value={txtTitle}
                label="Titulo"
                type="text"
                required={true}
                placeholder={'Chácara 99'}
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

            <div className="mb-2">
              <InputField
                name="txtAddress"
                value={txtAddress}
                label="Endereço"
                type="text"
                required={false}
                onChange={handleAddressChange}
              />
            </div>

            <div className="mb-2">
              <InputField
                name="txtCoordinates"
                value={txtCoordinates}
                label="Coordenadas"
                type="text"
                required={false}
                onChange={handleCoordinatesChange}
              />
            </div>
          </form>
          <div className="flex flex-row-reverse">
            <button className="btn-outline" onClick={handleSubmit}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
