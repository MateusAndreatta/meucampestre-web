import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import 'moment/locale/pt-br';
import RegisterConsumption from './registerConsumption';
import PictureConsumption from './pictureConsumption';
import ConfirmConsumption from './confirmConsumption';
import OutOfPeriodConsumption from './outOfPeriodConsumption';
import moment from 'moment';

export default function NewWaterConsumption() {
  const [mainState, setMainState] = useState({});
  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    // TODO: Fazer o request buscando as unidades do usuario logado
  }, []);

  const mockData = [
    { id: 1, unidade: 'Chácara 2', disponivel: true },
    { id: 2, unidade: 'Chácara 3', disponivel: false },
    { id: 3, unidade: 'Chácara 4', disponivel: true },
  ];

  function onClickButton(event) {
    if (formStep < 2) {
      setFormStep(formStep + 1);
    } else {
      setFormStep(0);
    }
  }

  function getComponentStep() {
    if (moment().date() < 20) return <OutOfPeriodConsumption />;
    switch (formStep) {
      case 0:
        return (
          <RegisterConsumption
            data={mockData}
            onClick={onClickButton}
            state={mainState}
          />
        );
      case 1:
        return <PictureConsumption onClick={onClickButton} state={mainState} />;
      case 2:
        return <ConfirmConsumption onClick={onClickButton} state={mainState} />;
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="my-8 text-2xl">Nova leitura</h1>
        {getComponentStep()}
      </div>
    </div>
  );
}
