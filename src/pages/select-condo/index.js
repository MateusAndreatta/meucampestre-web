import React from 'react';
import Navbar from '../../components/navbar';
import Card from '../../components/card';

import MeuCampestreLogo from '../../resources/MeuCampestreLogo.svg';

export default function SelectCondo() {
  const Img = () => {
    return (
      <img
        src={MeuCampestreLogo}
        alt="Meu Campestre"
        style={{ width: '100%', height: '100%' }}
      />
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="my-3 text-center text-2xl">
          Olá, qual condomínio deseja visualizar?
        </h1>
        <div className="my-4 flex flex-wrap justify-around gap-8 px-2 ">
          <div className="h-60 w-60 max-w-full">
            <Card icon={Img} title="Meu Campestre" />
          </div>
          <div className="h-60 w-60 max-w-full">
            <Card icon={Img} title="Meu Campestre 2 " />
          </div>
        </div>
      </div>
    </div>
  );
}
