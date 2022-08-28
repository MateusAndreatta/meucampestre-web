import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import { useNavigate, useParams } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import UnityRepository from '../../repository/UnityRepository';
import Button from '../../components/buttons/button';

export default function NewCommunArea() {
  let { id } = useParams();
  const [editMode, setEditMode] = useState(!!id);
  const [loadingButton, setLoadingButton] = useState(false);

  const [txtTitle, setTxtTitle] = useState('');
  const [txtAddress, setTxtAddress] = useState('');
  const [txtDescription, setTxtDescription] = useState('');
  const [txtCoordinates, setTxtCoordinates] = useState('');

  useEffect(() => {
    if (editMode) {
      UnityRepository.findById(id).then((response) => {
        console.log(response);
        setTxtTitle(response.titulo);
        setTxtAddress(response.endereco);
        setTxtDescription(response.descricao);
        // setTxtCoordinates(response.coordenadas);
      });
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

  const navigate = useNavigate();

  function handleSubmit() {
    if (txtTitle.length < 1) {
      Toaster.showInfo('É necessário informar o titulo');
      return;
    }
    setLoadingButton(true);
    if (editMode) {
      UnityRepository.update(
        {
          titulo: txtTitle,
          endereco: txtAddress,
          descricao: txtDescription,
          coordenadas: txtCoordinates,
        },
        id
      )
        .then((response) => {
          console.log(response);
          Toaster.showSuccess('Unidade editada!');
          navigate('/unidades');
        })
        .catch((error) => {
          if (error.response.data.message) {
            Toaster.showError(error.response.data.message);
          } else {
            Toaster.showError(
              'Ops, ocorreu um erro, tente novamente mais tarde'
            );
          }
        })
        .finally(() => {
          setLoadingButton(false);
        });
    } else {
      UnityRepository.create({
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
          Toaster.showError(
            'Não foi possivel cadastrar a unidade, tente novamente mais tarde'
          );
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
        <h1 className="my-8 text-2xl">
          {editMode ? 'Editar área comum' : 'Nova área comum'}
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
          </form>
          <div className="flex flex-row-reverse">
            <Button loading={loadingButton} onClick={handleSubmit}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
