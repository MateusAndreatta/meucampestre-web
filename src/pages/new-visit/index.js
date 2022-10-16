import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import { useNavigate, useParams } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import UnityRepository from '../../repository/UnityRepository';
import Button from '../../components/buttons/button';
import CheckboxField from '../../components/fields/checkboxField';
import AutocompleteField from '../../components/fields/autocompleteField';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import { maskCpfCnpj } from '../../mask';

export default function NewVisit() {
  let { id } = useParams();
  const [editMode, setEditMode] = useState(!!id);
  const [loadingButton, setLoadingButton] = useState(false);
  const [unidades, setUnidades] = useState(SessionData.getUnits());
  const [unidadesSelecionadas, setUnidadesSelecionadas] = useState(
    SessionData.getUnits()
  );
  const roles = SessionData.getRoles();
  const [sindicoOuPorteiro, setSindicoOuPorteiro] = useState(
    roles.includes(ROLES.PORTEIRO) || roles.includes(ROLES.SINDICO)
  );
  const [txtNome, setTxtNome] = useState('');
  const [txtDocumento, setTxtDocumento] = useState('');
  const [txtObservacao, setTxtObservacao] = useState('');
  const [txtPeriodoInicial, setTxtPeriodoInicial] = useState('');
  const [txtPeriodoFinal, setTxtPeriodoFinal] = useState('');
  const [acessoPermanente, setAcessoPermanente] = useState(false);
  const [isVisitante, setIsVisitante] = useState(false);
  const [isPrestador, setIsPrestador] = useState(false);

  useEffect(() => {
    if (editMode) {
      UnityRepository.findById(id).then((response) => {
        console.log(response);
      });
    }
  }, [editMode]);

  useEffect(() => {
    if (sindicoOuPorteiro) {
      UnityRepository.findAll()
        .then((response) => {
          setUnidades(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function handleNomeChange(event) {
    const value = event.target.value;
    setTxtNome(value);
  }

  function handleDocumentoChange(event) {
    const value = event.target.value;
    setTxtDocumento(maskCpfCnpj(value));
  }

  function handleObservacaoChange(event) {
    const value = event.target.value;
    setTxtObservacao(value);
  }

  function handlePeriodoInicialChange(event) {
    const value = event.target.value;
    setTxtPeriodoInicial(value);
  }

  function handlePeriodoFinalChange(event) {
    const value = event.target.value;
    setTxtPeriodoFinal(value);
  }

  function handleChangeAcessoPermanenteCheckbox() {
    setAcessoPermanente(!acessoPermanente);
  }

  function handleChangeVisitanteCheckbox() {
    setIsPrestador(isVisitante);
    setIsVisitante(!isVisitante);
  }

  function handleChangePrestadorCheckbox() {
    setIsPrestador(!isPrestador);
    setIsVisitante(isPrestador);
  }

  const onChangeAutocomplete = (selectedValue) => {
    if (!unidadesSelecionadas.includes(selectedValue)) {
      let newSelectedUnits = [...unidadesSelecionadas];
      newSelectedUnits.push(selectedValue);

      setUnidadesSelecionadas(newSelectedUnits);
    }
  };

  function removerUnidade(unidadeRemover) {
    setUnidadesSelecionadas(
      unidadesSelecionadas.filter((unidade) => unidade !== unidadeRemover)
    );
  }

  const navigate = useNavigate();

  function handleSubmit() {
    if (txtNome.length < 1) {
      Toaster.showInfo('É necessário informar o nome');
      return;
    }
    setLoadingButton(true);
    if (editMode) {
      UnityRepository.update(
        {
          // titulo: txtTitle,
          // endereco: txtAddress,
          // descricao: txtDescription,
          // coordenadas: txtCoordinates,
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
        // titulo: txtTitle,
        // endereco: txtAddress,
        // descricao: txtDescription,
        // coordenadas: txtCoordinates,
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
          {editMode ? 'Editar visita' : 'Nova visita'}
        </h1>
        <div>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-1">
            <div className="mb-2">
              <InputField
                name="txtNome"
                value={txtNome}
                label="Nome"
                type="text"
                required={true}
                onChange={handleNomeChange}
              />
            </div>

            <div className="mb-2">
              <InputField
                name="txtDocumento"
                value={txtDocumento}
                label="Documento"
                type="text"
                required={false}
                onChange={handleDocumentoChange}
              />
            </div>

            <div className="mb-2">
              <InputField
                name="txtObservacao"
                value={txtObservacao}
                label="Observação"
                type="text"
                required={false}
                onChange={handleObservacaoChange}
              />
            </div>

            <CheckboxField
              label="Acesso permanente"
              checked={acessoPermanente}
              onChange={handleChangeAcessoPermanenteCheckbox}
            />

            <div className="mb-2 grid grid-cols-2 grid-rows-1 gap-4">
              <div>
                <InputField
                  name="txtPeriodoInicial"
                  value={txtPeriodoInicial}
                  label="Período inicial"
                  type="date"
                  required={false}
                  disabled={acessoPermanente}
                  onChange={handlePeriodoInicialChange}
                />
              </div>

              <div>
                <InputField
                  name="txtPeriodoFinal"
                  value={txtPeriodoFinal}
                  label="Período final"
                  type="date"
                  required={false}
                  disabled={acessoPermanente}
                  onChange={handlePeriodoFinalChange}
                />
              </div>
            </div>

            <CheckboxField
              label="Visitante"
              checked={isVisitante}
              onChange={handleChangeVisitanteCheckbox}
            />

            <CheckboxField
              label="Prestador de serviço"
              checked={isPrestador}
              onChange={handleChangePrestadorCheckbox}
            />

            <AutocompleteField
              items={unidades}
              onChangeAutocomplete={onChangeAutocomplete}
              disabled={unidades.length <= 0}
              label="Chácara"
              optionName="titulo"
              optionKey="id"
              required={true}
            />

            <div className="flex flex-wrap">
              {unidadesSelecionadas.map((unidade) => (
                <span
                  className="ml-1 mb-1 w-auto rounded-full bg-gray-400 px-4 py-2 text-base text-white"
                  key={unidade.id}>
                  {unidade.titulo}
                  <button
                    className="hover bg-transparent"
                    onClick={() => removerUnidade(unidade)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="ml-4"
                      viewBox="0 0 1792 1792">
                      <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
                    </svg>
                  </button>
                </span>
              ))}
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
