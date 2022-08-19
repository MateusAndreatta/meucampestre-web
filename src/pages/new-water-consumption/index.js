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
import Toaster from '../../utils/ui/toaster';
import { useNavigate } from 'react-router-dom';

export default function NewWaterConsumption() {
  const [mainState, setMainState] = useState({});
  const [formStep, setFormStep] = useState(0);
  const navigate = useNavigate();
  let unidades = SessionData.getUnits();

  useEffect(() => {
    // TODO: É interessante ter um request que envie as unidades do usuario, e retorne dizendo quais ainda ta disponivel para leitura

    if (unidades === null || unidades.length <= 0) {
      Toaster.showError('Você não tem unidades cadastradas');
      navigate('/home');
    }
  }, []);

  function onClickButton(event) {
    if (formStep < 2) {
      setFormStep(formStep + 1);
    } else {
      setFormStep(0);
    }
  }

  function getComponentStep() {
    if (moment().date() < 18) return <OutOfPeriodConsumption />;

    if (unidades.every((element) => element.disponivel === false))
      return <AllCompletedConsumption />;

    switch (formStep) {
      case 0:
        return (
          <RegisterConsumption
            data={unidades}
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
