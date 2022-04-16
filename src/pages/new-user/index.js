import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';

function UserForm() {
  const [txtName, setTxtName] = useState('');
  const [txtEmail, setTxtEmail] = useState('');
  const [txtPhone, setTxtPhone] = useState('');
  const [txtDocument, setTxtDocument] = useState('');

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

  return (
    <div>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            label="CPF"
            type="text"
            required={true}
            onChange={handleDocumentChange}
          />
        </div>
      </form>
      <div className=" flex flex-row-reverse">
        <button className="btn-outline">Salvar</button>
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
  const [documentValid, setDocumentValid] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className=" my-8 text-2xl">Novo acesso</h1>
        {documentValid ? (
          <UserForm />
        ) : (
          <ValidateDocument setDocumentValid={setDocumentValid} />
        )}
      </div>
    </div>
  );
}
