import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import { useNavigate, useParams } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import UnityRepository from '../../repository/UnityRepository';
import Button from '../../components/buttons/button';
import { maskCpfCnpj } from '../../mask';

export default function NewBlockedCpf() {
  let { id } = useParams();
  const [editMode, setEditMode] = useState(!!id);
  const [loadingButton, setLoadingButton] = useState(false);

  const [txtNome, setTxtNome] = useState('');
  const [txtDocumento, setTxtDocumento] = useState('');
  const [txtMotivo, setTxtMotivo] = useState('');

  useEffect(() => {
    if (editMode) {
      UnityRepository.findById(id).then((response) => {
        console.log(response);
        setTxtNome(response.nome);
        setTxtDocumento(response.documento);
        setTxtMotivo(response.motivo);
      });
    }
  }, [editMode]);

  function handleNomeChange(event) {
    const value = event.target.value;
    setTxtNome(value);
  }

  function handleDocumentoChange(event) {
    const value = event.target.value;
    setTxtDocumento(maskCpfCnpj(value));
  }

  function handleMotivoChange(event) {
    const value = event.target.value;
    setTxtMotivo(value);
  }

  const navigate = useNavigate();

  function handleSubmit() {
    if (setTxtDocumento.length < 1) {
      Toaster.showInfo('É necessário informar o documento!');
      return;
    }
    setLoadingButton(true);
    if (editMode) {
      UnityRepository.update(
        {
          nome: txtNome,
          documento: txtDocumento,
          motivo: txtMotivo,
        },
        id
      )
        .then((response) => {
          console.log(response);
          Toaster.showSuccess('Unidade editada!');
          navigate('/unidades');
        })
        .finally(() => {
          setLoadingButton(false);
        });
    } else {
      UnityRepository.create({
        nome: txtNome,
        documento: txtDocumento,
        motivo: txtMotivo,
      })
        .then((response) => {
          console.log(response);
          Toaster.showSuccess('Nova unidade criada!');
          navigate('/unidades');
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
          {editMode ? 'Editar bloqueio CPF' : 'Novo bloqueio CPF'}
        </h1>
        <div>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-1">
            <div className="mb-2">
              <InputField
                name="txtNome"
                value={txtNome}
                label="Nome"
                type="text"
                required={false}
                onChange={handleNomeChange}
              />
            </div>

            <div className="mb-2">
              <InputField
                name="txtDocumento"
                value={txtDocumento}
                label="Documento"
                type="text"
                required={true}
                onChange={handleDocumentoChange}
              />
            </div>

            <div className="mb-2">
              <InputField
                name="txtMotivo"
                value={txtMotivo}
                label="Motivo"
                type="text"
                required={false}
                onChange={handleMotivoChange}
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
