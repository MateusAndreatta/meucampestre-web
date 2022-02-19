import React from 'react';
import InputField from '../../components/fields/inputField';
import PopAlert from '../../components/alerts/popAlert';
import Toaster from '../../utils/ui/toaster';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      txtEmail: '',
      txtPassword: '',
    };
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(e) {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  render() {
    const notify = () => Toaster.showSuccess('Toast from my Toaster!');

    return (
      <div className="grid h-screen place-items-center">
        <div className="card flex h-full w-full max-w-md flex-col px-4 py-8 sm:px-6 md:h-auto md:px-8 lg:px-10">
          <div className="mb-6 self-center text-xl font-light text-gray-600 sm:text-2xl">
            Entrar na sua conta
          </div>
          <div className="mt-8">
            <div className="mb-2 flex flex-col">
              <InputField
                name="txtEmail"
                value={this.state.txtEmail}
                label="E-mail"
                type="email"
                errorLabel="E-mail invalido"
                required={true}
                onChange={this.onUpdate}
              />
            </div>
            <div className="mb-6 flex flex-col">
              <InputField
                name="txtPassword"
                value={this.state.txtPassword}
                label="Senha"
                type="password"
                required={true}
                onChange={this.onUpdate}
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
          </div>
          <div className="mt-6 flex items-center justify-center">
            <a
              href="/"
              className="inline-flex items-center text-center text-xs font-thin text-gray-500 hover:text-gray-700">
              <span className="ml-2">Ainda não possui uma conta?</span>
            </a>
          </div>
          <PopAlert
            title="Alertzão"
            content="Deu boa jovem!"
            delay={4000}
            type={PopAlert.type.success}
          />
        </div>
      </div>
    );
  }
}

export default Login;
