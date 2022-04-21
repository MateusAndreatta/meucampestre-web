import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import axios from 'axios';
import { API_ENDPOINT } from '../../globals';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';

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

function UserForm() {
  const [txtName, setTxtName] = useState('');
  const [txtEmail, setTxtEmail] = useState('');
  const [txtPhone, setTxtPhone] = useState('');
  const [txtDocument, setTxtDocument] = useState('');
  const [checkRoleCondomino, setCheckRoleCondomino] = useState(false);
  const [checkRolePorteiro, setCheckRolePorteiro] = useState(false);
  const [checkRoleConselheiro, setCheckRoleConselheiro] = useState(false);
  const [checkRoleSindico, setCheckRoleSindico] = useState(false);

  let { documento } = useParams();
  const [editMode, setEditMode] = useState(!!documento);
  console.log('----------------------');
  console.log(documento);
  console.log(editMode);
  console.log('----------------------');

  useEffect(() => {
    if (editMode) {
      getDataFromApi(auth.token, documento).then((response) => {
        setTxtName(response.data.nome);
        setTxtEmail('maria.joaquina@gmail.com');
        // setTxtPhone(response.data.telefono);
        setTxtDocument(response.data.documento);
      });
    }
  }, [editMode]);

  const auth = useSelector((state) => state.session.auth);

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
    setTxtPhone(value);
  }

  function handleDocumentChange(event) {
    const value = event.target.value;
    setTxtDocument(value);
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

  // todo passar todas as roles para uma constante global
  function getRoles() {
    let roles = [];
    if (checkRoleCondomino) {
      roles.push('ROLE_MORADOR');
    }
    if (checkRoleConselheiro) {
      roles.push('ROLE_CONSELHEIRO');
    }
    if (checkRoleSindico) {
      roles.push('ROLE_SINDICO');
    }
    if (checkRolePorteiro) {
      roles.push('ROLE_PORTEIRO');
    }
    return roles;
  }

  function handleSubmit() {
    if (editMode) {
      updateUserApi(auth.token, {
        nome: txtName,
        documento: txtDocument,
        papeis: getRoles(), //TODO: ALTERAR PARA NÃO SER HARDCODED E ACEITAR LISTA (PENDENTE BACK)
      }).then((response) => {
        console.log(response);
        Toaster.showSuccess('Usuario editado com sucesso!');
        navigate('/acessos');
      });
    } else {
      sendDataToApi(auth.token, {
        nome: txtName,
        senha: txtDocument,
        email: txtEmail,
        documento: txtDocument,
        papel: 'ROLE_MORADOR', //TODO: ALTERAR PARA NÃO SER HARDCODED E ACEITAR LISTA (PENDENTE BACK)
      }).then((response) => {
        console.log(response);
        Toaster.showSuccess('Novo acesso criado!');
        navigate('/acessos');
      });
    }
  }

  return (
    <div>
      {/* md:grid-cols-2 */}
      <form className="grid grid-cols-1 gap-4 md:grid-cols-1">
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
        {/*<div className="mb-2">*/}
        {/*  <InputField*/}
        {/*    name="txtPhone"*/}
        {/*    value={txtPhone}*/}
        {/*    label="Telefone"*/}
        {/*    type="tel"*/}
        {/*    required={true}*/}
        {/*    onChange={handlePhoneChange}*/}
        {/*  />*/}
        {/*</div>*/}
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
        <div className="mb-2">
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

          <label className="mr-6 mb-3 flex items-center space-x-3">
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
      </form>
      <div className=" flex flex-row-reverse">
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
