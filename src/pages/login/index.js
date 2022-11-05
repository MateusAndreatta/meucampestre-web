import React, { useState } from 'react';
import InputField from '../../components/fields/inputField';
import Toaster from '../../utils/ui/toaster';
import { Link, useNavigate } from 'react-router-dom';
import { maskCpfCnpj } from '../../mask';
import SessionData from '../../utils/sessionData';
import MyAccountRepository from '../../repository/MyAccountRepository';
import LoadingIcon from '../../components/icons/loadingIcon';
import AccountRepository from '../../repository/AccountRepository';

export default function Login() {
  const [txtDocumento, setTxtDocumento] = useState('');
  const [txtPassword, setTxtPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);

  function handleDocumentoChange(event) {
    const value = event.target.value;
    setTxtDocumento(maskCpfCnpj(value));
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setTxtPassword(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (txtDocumento.length < 1 || txtPassword.length < 1) {
      Toaster.showInfo('Preencha todos os campos');
      return;
    }
    setLoding(true);
    sessionStorage.clear();
    const documento = txtDocumento.replace(/[^\d]+/g, '');
    requestLogin({ documento: documento, senha: txtPassword });
  }

  function requestLogin(data) {
    AccountRepository.login(data)
      .then((response) => {
        if (response.data) {
          const token = response.data.access_token;

          if (token) {
            SessionData.setToken(token);

            MyAccountRepository.find().then((userDataResponse) => {
              SessionData.setUser(userDataResponse);
              handleUserRoute(userDataResponse);
            });
          }
        } else {
          Toaster.showError(
            'Não foi possível realizar o login, tente novamente mais tarde'
          );
          setLoding(true);
        }
      })
      .catch((error) => {
        Toaster.showError('Documento ou senha inválidos');
        setLoding(false);
      });
  }

  function handleUserRoute(userData) {
    if (userData.condominios) {
      const condosList = userData.condominios;
      if (condosList.length > 0) {
        if (condosList.length > 1) {
          navigate('/selecionar-condominio');
          return;
        }

        let condo = condosList[0];
        MyAccountRepository.findRolesByCondoId(condo.id)
          .then((response) => {
            let roles = [];
            response.forEach(function (permission) {
              roles.push(permission.nome);
            });
            SessionData.setRoles(roles);
            SessionData.setCondo(condo);
            navigate('/home');
          })
          .catch((error) => {
            Toaster.showError(
              'Não foi possivel concluir seu login, tente novamente mais tarde'
            );
          })
          .finally(() => {
            setLoding(false);
          });
      } else {
        Toaster.showError('Ops! Não foi possível encontrar seu condomínio.');
        setLoding(false);
      }
    }
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="card flex aspect-auto h-full w-full max-w-md flex-col px-4 py-8 sm:px-6 md:h-auto md:px-8 lg:px-10">
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
                maxLength="18"
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
                <Link
                  className="inline-flex text-xs font-thin text-gray-500 hover:text-gray-700 sm:text-sm"
                  to="/redefinir-senha">
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="w-full rounded-lg bg-purple-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  focus:ring-offset-purple-200">
                <div className="inline-flex items-center ">
                  Entrar
                  {loading ? <LoadingIcon color="text-white" /> : ''}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
