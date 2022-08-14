import React, { useRef, useState } from 'react';
import Button from '../../components/buttons/button';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

export default function AllCompletedConsumption(props) {
  const navigate = useNavigate();

  return (
    <div>
      <Player
        autoplay
        loop
        src="https://assets4.lottiefiles.com/private_files/lf30_hxmzmij0.json"
        style={{ height: '300px', maxWidth: '300px' }}
      />
      <p className="text-center font-semibold">Você já realizou sua leitura!</p>
      <p className="text-center">
        A leitura desse mês foi concluída com sucesso! Volte no próximo mês.
      </p>

      <div className="my-7 grid place-content-center">
        <Button onClick={() => navigate('/home')}>Voltar</Button>
      </div>
    </div>
  );
}
