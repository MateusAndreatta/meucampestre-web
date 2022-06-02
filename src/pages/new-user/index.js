import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import AutocompleteField from '../../components/fields/autocompleteField';
import axios from 'axios';
import { API_ENDPOINT } from '../../globals';
import { useNavigate, useParams } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import { maskCpfCnpj, maskPhone } from '../../mask';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import UnityRepository from '../../repository/UnityRepository';

const condo = SessionData.getCondo();

//TODO: Refatorar chamadas para a API usando o repository
function sendDataToApi(token, data) {
  return axios({
    method: 'POST',
    url: `${API_ENDPOINT}/usuarios/${condo.id}/usuario`,
    params: {},
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function updateUserApi(token, data, documento) {
  return axios({
    method: 'PUT',
    url: `${API_ENDPOINT}/usuarios/${condo.id}/usuario/${documento}`,
    params: {},
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getDataFromApi(token, documento) {
  return axios({
    method: 'GET',
    url: `${API_ENDPOINT}/usuarios/${condo.id}/usuario/${documento}`,
    params: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function UserForm() {
  const [txtName, setTxtName] = useState('');
  const [txtEmail, setTxtEmail] = useState('');
  const [txtPhone, setTxtPhone] = useState('');
  const [txtDocument, setTxtDocument] = useState('');
  const [checkRoleCondomino, setCheckRoleCondomino] = useState(false);
  const [checkRolePorteiro, setCheckRolePorteiro] = useState(false);
  const [checkRoleConselheiro, setCheckRoleConselheiro] = useState(false);
  const [checkRoleSindico, setCheckRoleSindico] = useState(false);

  const [unidadesSelecionadas, setUnidadesSelecionadas] = useState([]);

  //TODO: Popular com os dados do banco
  const [unidades, setUnidades] = useState([]);

  let { documento } = useParams();
  const [editMode, setEditMode] = useState(!!documento);

  useEffect(() => {
    if (editMode) {
      getDataFromApi(token, documento).then((response) => {
        let data = response.data;

        setTxtName(data.nome);
        setTxtEmail(data.email);
        setTxtPhone(maskPhone(data.telefone));
        setTxtDocument(maskCpfCnpj(data.documento));

        data.papeis.forEach((x) => {
          let role = x.nome;

          if (role === ROLES.MORADOR) {
            setCheckRoleCondomino(true);
          }
          if (role === ROLES.PORTEIRO) {
            setCheckRolePorteiro(true);
          }
          if (role === ROLES.CONSELHEIRO) {
            setCheckRoleConselheiro(true);
          }
          if (role === ROLES.SINDICO) {
            setCheckRoleSindico(true);
          }
        });
      });
    }
  }, [editMode]);

  useEffect(() => {
    UnityRepository.findAll()
      .then((response) => {
        setUnidades(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const token = SessionData.getToken();

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
    setTxtDocument(maskCpfCnpj(value));
  }

  const handleChangeCondomino = () => {
    setCheckRoleCondomino(!checkRoleCondomino);
  };

  const handleChangePorteiro = () => {
    setCheckRolePorteiro(!checkRolePorteiro);
  };

  const handleChangeConselheiro = () => {
    setCheckRoleConselheiro(!checkRoleConselheiro);
  };

  const handleChangeSindico = () => {
    setCheckRoleSindico(!checkRoleSindico);
  };

  const navigate = useNavigate();

  function getRoles() {
    let roles = [];
    if (checkRoleCondomino) {
      roles.push(ROLES.MORADOR);
    }
    if (checkRoleConselheiro) {
      roles.push(ROLES.CONSELHEIRO);
    }
    if (checkRoleSindico) {
      roles.push(ROLES.SINDICO);
    }
    if (checkRolePorteiro) {
      roles.push(ROLES.PORTEIRO);
    }
    return roles;
  }

  function getUnitsIds() {
    return [];
    let unitsId = [];
    unidadesSelecionadas.forEach((unidade) => {
      unitsId.push(unidade.id);
    });
    return unitsId;
  }

  function handleSubmit() {
    if (
      txtDocument.length < 1 ||
      txtName.length < 1 ||
      (!checkRolePorteiro &&
        !checkRoleSindico &&
        !checkRoleConselheiro &&
        !checkRoleCondomino)
    ) {
      Toaster.showInfo('Preencha todos os campos');
      return;
    }

    const documento = txtDocument.replace(/[^\d]+/g, '');
    const telefone = txtPhone.replace(/[^\d]+/g, '');
    if (editMode) {
      updateUserApi(
        token,
        {
          nome: txtName,
          senha: documento, // TODO: No atualizar dados nao pode forcar que a id seja o documento novamente..
          email: txtEmail,
          documento: documento,
          telefone: telefone,
          papeis: getRoles(),
          unidades: getUnitsIds(),
        },
        documento
      )
        .then((response) => {
          Toaster.showSuccess('Usuario editado com sucesso!');
          navigate('/acessos');
        })
        .catch((error) => {
          if (error.response.data.message) {
            Toaster.showError(error.response.data.message);
          } else {
            Toaster.showError(
              'Ops, ocorreu um erro, tente novamente mais tarde'
            );
          }
        });
    } else {
      let roles = getRoles();
      sendDataToApi(token, {
        nome: txtName,
        senha: documento,
        email: txtEmail,
        documento: documento,
        telefone: telefone,
        papeis: roles,
        unidades: getUnitsIds(),
      })
        .then((response) => {
          Toaster.showSuccess('Novo acesso criado!');
          navigate('/acessos');
        })
        .catch((error) => {
          if (error.response.data.message) {
            Toaster.showError(error.response.data.message);
          } else {
            Toaster.showError(
              'Ops, ocorreu um erro, tente novamente mais tarde'
            );
          }
        });
    }
  }

  function removerUnidade(unidadeRemover) {
    setUnidadesSelecionadas(
      unidadesSelecionadas.filter((unidade) => unidade !== unidadeRemover)
    );
  }

  const onChangeAutocomplete = (selectedValue) => {
    if (!unidadesSelecionadas.includes(selectedValue)) {
      let newSelectedUnits = [...unidadesSelecionadas];
      newSelectedUnits.push(selectedValue);

      setUnidadesSelecionadas(newSelectedUnits);
    }
  };

  return (
    <div>
      {/* md:grid-cols-2 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
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
            disabled={editMode}
            maxLength="18"
            onChange={handleDocumentChange}
          />
        </div>
        <div className="mb-2">
          {/*TODO: Transformar os Checkbox em um componente reutilizavel*/}
          <label className="mr-6 mb-3 flex items-center space-x-3">
            <input
              type="checkbox"
              name="condominio"
              className="h-6 w-6 appearance-none rounded-md border border-gray-300 bg-white checked:border-transparent checked:bg-blue-500 checked:bg-check focus:outline-none"
              checked={checkRoleCondomino}
              onChange={handleChangeCondomino}
            />
            <span className="font-normal text-gray-700">Condômino</span>
          </label>

          <label className="mr-6 mb-3 flex items-center space-x-3">
            <input
              type="checkbox"
              name="checkPorteiro"
              className="h-6 w-6 appearance-none rounded-md border border-gray-300 bg-white checked:border-transparent checked:bg-blue-500 checked:bg-check focus:outline-none"
              checked={checkRolePorteiro}
              onChange={handleChangePorteiro}
            />
            <span className="font-normal text-gray-700">Porteiro</span>
          </label>

          <label className="mr-6 mb-3 flex items-center space-x-3">
            <input
              type="checkbox"
              name="filterCondominio"
              className="h-6 w-6 appearance-none rounded-md border border-gray-300 bg-white checked:border-transparent checked:bg-blue-500 checked:bg-check focus:outline-none"
              checked={checkRoleConselheiro}
              onChange={handleChangeConselheiro}
            />
            <span className="font-normal text-gray-700">Conselho</span>
          </label>

          <label className="mr-6 flex items-center space-x-3">
            <input
              type="checkbox"
              name="filterCondominio"
              className="h-6 w-6 appearance-none rounded-md border border-gray-300 bg-white checked:border-transparent checked:bg-blue-500 checked:bg-check focus:outline-none"
              checked={checkRoleSindico}
              onChange={handleChangeSindico}
            />
            <span className="font-normal text-gray-700">Síndico</span>
          </label>
        </div>

        {/*<AutocompleteField*/}
        {/*  items={unidades}*/}
        {/*  onChangeAutocomplete={onChangeAutocomplete}*/}
        {/*  disabled={unidades.length <= 0}*/}
        {/*  label="Chácara"*/}
        {/*  optionName="titulo"*/}
        {/*  optionKey="id"*/}
        {/*/>*/}

        {/*<div className="flex flex-wrap">*/}
        {/*  {unidadesSelecionadas.map((unidade) => (*/}
        {/*    <span*/}
        {/*      className="ml-1 mb-1 w-auto rounded-full bg-gray-400 px-4 py-2 text-base text-white"*/}
        {/*      key={unidade.id}>*/}
        {/*      {unidade.titulo}*/}
        {/*      <button*/}
        {/*        className="hover bg-transparent"*/}
        {/*        onClick={() => removerUnidade(unidade)}>*/}
        {/*        <svg*/}
        {/*          xmlns="http://www.w3.org/2000/svg"*/}
        {/*          width="12"*/}
        {/*          height="12"*/}
        {/*          fill="currentColor"*/}
        {/*          className="ml-4"*/}
        {/*          viewBox="0 0 1792 1792">*/}
        {/*          <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />*/}
        {/*        </svg>*/}
        {/*      </button>*/}
        {/*    </span>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
      <div className="flex flex-row-reverse">
        <button className="btn-outline" onClick={handleSubmit}>
          Salvar
        </button>
      </div>
    </div>
  );
}

function ValidateDocument(props) {
  const [txtDocument, setTxtDocument] = useState('');

  function handleDocumentChange(event) {
    const value = event.target.value;
    setTxtDocument(value);
  }

  function onButtonClick() {
    // Realizar a request para o back validando o CPF
    props.setDocumentValid(true);
  }

  return (
    <div>
      <p className="mb-5">
        Para adicionar um novo acesso ao sistema, informe o CPF dele
      </p>
      <form>
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
          Próximo
        </button>
      </div>
    </div>
  );
}

export default function NewUser() {
  const [documentValid, setDocumentValid] = useState(true);
  let { documento } = useParams();
  const [editMode, setEditMode] = useState(!!documento);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className=" my-8 text-2xl">
          {editMode ? 'Editar usuário' : 'Novo usuário'}
        </h1>
        {documentValid ? (
          <UserForm />
        ) : (
          <ValidateDocument setDocumentValid={setDocumentValid} />
        )}
      </div>
    </div>
  );
}
