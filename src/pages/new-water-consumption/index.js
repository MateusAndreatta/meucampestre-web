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
import WaterConsumptionRepository from '../../repository/WaterConsumptionRepository';
import LoadingIcon from '../../components/icons/loadingIcon';

export default function NewWaterConsumption() {
  const [mainState, setMainState] = useState({});
  const [formStep, setFormStep] = useState(0);
  const [unidades, setUnidades] = useState(SessionData.getUnits());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (unidades === null || unidades.length <= 0) {
      Toaster.showError('Você não tem unidades cadastradas');
      navigate('/home');
    }

    let idsUnidades = unidades.map((unidade) => {
      return unidade.id;
    });

    WaterConsumptionRepository.validate({ idsUnidades: idsUnidades })
      .then((response) => {
        console.log(response.data);
        response.data.statusLeituraUnidades.forEach((statusLeitura) => {
          let a = unidades.find((x) => x.id === statusLeitura.idUnidade);
          a.leituraRealizada = statusLeitura.leituraRealizada;
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  function onClickButton(event) {
    if (formStep === 0 && mainState.unidade.leituraRealizada === true) {
      Toaster.showError(
        'Você já realizou a leitura desse mês da ' + mainState.unidade.titulo
      );
      return;
    }

    if (formStep < 2) {
      setFormStep(formStep + 1);
    } else {
      setFormStep(0);
    }
  }

  function getComponentStep() {
    if (moment().date() < 20) return <OutOfPeriodConsumption />;

    if (unidades.every((element) => element.leituraRealizada === true))
      return <AllCompletedConsumption />;

    // eslint-disable-next-line default-case
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

  function loadingComponent() {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="font-medium">Carregando as suas chácaras</p>
        <p className="mb-5 font-normal">Aguarde só mais um momento</p>
        <LoadingIcon width={'w-10'} height={'w-10'} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="my-8 text-2xl">Nova leitura</h1>
        {loading ? loadingComponent() : getComponentStep()}
      </div>
    </div>
  );
}
