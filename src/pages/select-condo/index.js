import React from 'react';
import Card from '../../components/card';

import MeuCampestreLogo from '../../resources/MeuCampestreLogo.svg';
import SessionData from '../../utils/sessionData';
import { useNavigate } from 'react-router-dom';
import MyAccountRepository from '../../repository/MyAccountRepository';
import Toaster from '../../utils/ui/toaster';

export default function SelectCondo() {
  let condominiums = SessionData.getUser().condominios;
  console.log(condominiums);
  const navigate = useNavigate();

  if (!condominiums) {
    navigate('/');
  }

  function onCondoSelected(condo) {
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
      });
  }

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="my-3 text-center text-2xl">
          Olá, qual condomínio deseja visualizar?
        </h1>
        <div className="my-4 flex h-60 flex-wrap justify-around gap-8 px-2 ">
          {condominiums.map((condo) => {
            const Img = (link) => {
              return (
                <img
                  src={condo.imagemUrl || MeuCampestreLogo}
                  alt={condo.nome}
                  style={{ width: '100%', height: '100%' }}
                />
              );
            };

            return (
              <div
                className="h-60 w-60 max-w-full cursor-pointer"
                key={condo.id}
                onClick={(event) => onCondoSelected(condo)}>
                <Card icon={Img} title={condo.nome} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
