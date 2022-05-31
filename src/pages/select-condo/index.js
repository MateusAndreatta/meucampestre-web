import React from 'react';
import Card from '../../components/card';

import MeuCampestreLogo from '../../resources/MeuCampestreLogo.svg';
import SessionData from '../../utils/sessionData';
import { Navigate, useNavigate } from 'react-router-dom';

export default function SelectCondo() {
  let condominiums = SessionData.getUser().condominios;
  console.log(condominiums);
  const navigate = useNavigate();

  if (!condominiums) {
    navigate('/');
  }

  function onCondoSelected(condo) {
    console.log(condo);
    SessionData.setCondo(condo);
    navigate('/home');
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
