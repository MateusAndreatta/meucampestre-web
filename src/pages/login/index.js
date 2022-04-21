import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputField from '../../components/fields/inputField';
import Toaster from '../../utils/ui/toaster';
import { login } from '../../actions/session';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const session = useSelector((state) => state);
  const auth = useSelector((state) => state.session.auth);
  const user = useSelector((state) => state.session.user);
  console.log(session);
  const [txtDocumento, setTxtDocumento] = useState('');
  const [txtPassword, setTxtPassword] = useState('');

  const dispatch = useDispatch();

  function handleDocumentoChange(event) {
    const value = event.target.value;

    setTxtDocumento(value);
  }

  function handlePasswordChange(event) {
    const value = event.target.value;

    setTxtPassword(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(login({ documento: txtDocumento, senha: txtPassword }));
  }

  if (auth.authenticated) {
    console.log(user.data);

    if (user.data) {
      if (user.data.condominios.length === 1) {
        return <Navigate to="/home" replace={true} />;
      } else if (user.data.condominios.length > 1) {
        return <Navigate to="/selecionar-condominio" replace={true} />;
      } else {
        Toaster.showError('Ops! Não foi possível encontrar seu condomínio.');
      }
    }
  }
  const notify = () => Toaster.showInfo('Enviado request para o backend!');

  return (
    <div className="grid h-screen place-items-center">
      <div className="card flex h-full w-full max-w-md flex-col px-4 py-8 sm:px-6 md:h-auto md:px-8 lg:px-10">
        <div className="mb-6 self-center text-xl font-light text-gray-600 sm:text-2xl">
          Entrar na sua conta
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-2 flex flex-col">
              <InputField
                name="txtDocumento"
                value={txtDocumento}
                label="Documento"
                type="text"
                required={true}
                onChange={handleDocumentoChange}
              />
            </div>
            <div className="mb-6 flex flex-col">
              <InputField
                name="txtPassword"
                value={txtPassword}
                label="Senha"
                type="password"
                required={true}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-6 -mt-4 flex items-center">
              <div className="ml-auto flex">
                <a
                  className="inline-flex text-xs font-thin text-gray-500 hover:text-gray-700 sm:text-sm"
                  href="/">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="w-full rounded-lg  bg-purple-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  focus:ring-offset-purple-200"
                onClick={notify}>
                Entrar
              </button>
            </div>
          </form>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <a
            href="/"
            className="inline-flex items-center text-center text-xs font-thin text-gray-500 hover:text-gray-700">
            <span className="ml-2">Ainda não possui uma conta?</span>
          </a>
        </div>
      </div>
    </div>
  );
}
