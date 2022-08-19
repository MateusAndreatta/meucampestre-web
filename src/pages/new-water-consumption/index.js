import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import 'moment/locale/pt-br';
import RegisterConsumption from './registerConsumption';
import PictureConsumption from './pictureConsumption';
import ConfirmConsumption from './confirmConsumption';
import OutOfPeriodConsumption from './outOfPeriodConsumption';
import moment from 'moment';
import AllCompletedConsumption from './allCompletedConsumption';
import SessionData from '../../utils/sessionData';

export default function NewWaterConsumption() {
  const [mainState, setMainState] = useState({});
  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    // TODO: Fazer o request buscando as unidades do usuario logado - Já traz no minhaconta
    // TODO: Retornar para a home com o feeddback de erro caso não encontre nenhuma unidade
  }, []);

  const mockData = SessionData.getUnits();

  function onClickButton(event) {
    if (formStep < 2) {
      setFormStep(formStep + 1);
    } else {
      setFormStep(0);
    }
  }

  function getComponentStep() {
    if (moment().date() < 18) return <OutOfPeriodConsumption />;

    if (mockData.every((element) => element.disponivel === false))
      return <AllCompletedConsumption />;

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
