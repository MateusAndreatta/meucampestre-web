import React from 'react';
import Button from '../../components/buttons/button';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import moment from 'moment';

export default function OutOfPeriodConsumption(props) {
  const navigate = useNavigate();

  const endOfMonth = moment().clone().endOf('month').format('DD');

  return (
    <div>
      <Player
        autoplay
        keepLastFrame={true}
        src="https://assets7.lottiefiles.com/packages/lf20_6958h79x.json"
        style={{ height: '300px', maxWidth: '300px' }}
      />
      <p className="text-center font-semibold">OPS!</p>
      <p className="text-center">
        {`Não é possível enviar a leitura fora do período (a leitura acontece do
        dia 20 ao dia ${endOfMonth})`}
      </p>

      <div className="my-7 grid place-content-center">
        <Button onClick={() => navigate('/home')}>Voltar</Button>
      </div>
    </div>
  );
}
