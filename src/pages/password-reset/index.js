import React, { useState } from 'react';
import InputField from '../../components/fields/inputField';
import Toaster from '../../utils/ui/toaster';
import { maskCpfCnpj } from '../../mask';
import LoadingIcon from '../../components/icons/loadingIcon';
import AccountRepository from '../../repository/AccountRepository';

export default function PasswordReset() {
  const [txtDocumento, setTxtDocumento] = useState('');
  const [loading, setLoding] = useState(false);

  function handleDocumentoChange(event) {
    const value = event.target.value;

    setTxtDocumento(maskCpfCnpj(value));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (txtDocumento.length < 1) {
      Toaster.showInfo('Preencha seu CPF ou CNPJ');
      return;
    }
    setLoding(true);
    const documento = txtDocumento.replace(/[^\d]+/g, '');
    AccountRepository.passwordReset({ documento: documento })
      .then((response) => {
        console.log(response);
        Toaster.showSuccess('E-mail para recuperar senha enviado');
      })
      .finally(() => {
        setLoding(false);
      });
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="card flex aspect-auto h-full w-full max-w-md flex-col px-4 py-8 sm:px-6 md:h-auto md:px-8 lg:px-10">
        <div className="mb-3 self-center text-xl font-light text-gray-600 sm:text-2xl">
          Recuperar acesso a conta
        </div>
        <div className="mb-3 self-center font-light text-gray-600">
          Para recuperar sua conta, informe seu CPF ou CNPJ.
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col">
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

            <div className="flex w-full">
              <button
                type="submit"
                className="w-full rounded-lg bg-purple-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  focus:ring-offset-purple-200">
                <div className="inline-flex items-center ">
                  Recuperar conta
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
