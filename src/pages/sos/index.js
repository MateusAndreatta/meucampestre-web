import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { useNavigate } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import SessionData from '../../utils/sessionData';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import Button from '../../components/buttons/button';

export default function Sos() {
  const navigate = useNavigate();

  const [unidades, setUnidades] = useState(SessionData.getUnits());
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);

  async function handleClickCallForHelp() {
    if (!unidadeSelecionada) {
      Toaster.showError('Selecione uma unidade para chamar por ajuda');
      return;
    }

    await setDoc(doc(db, 'sos', `unidade_${unidadeSelecionada.id}`), {
      ...unidadeSelecionada,
    })
      .then(() => {
        Toaster.showSuccess('Chamado realizado com sucesso');
      })
      .catch((error) => {
        Toaster.showError('Infelizmente não foi possível realizar o chamado');
      });
  }

  useEffect(() => {
    if (unidades.length === 1) {
      unidadeSelecionada(unidades[0]);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8">
          <h1 className="text-center text-2xl">CHAMADO SOS</h1>
        </div>
        <div className="flex flex-col justify-center">
          {unidades.length > 1 ? (
            <div className="mx-auto">
              <h3>Selecione a unidade que deseja socorro.</h3>
              <div className="mt-1 flex gap-2">
                {unidades.map((unidade) => (
                  <Button
                    key={unidade.id}
                    selected={unidadeSelecionada?.id === unidade.id}
                    onClick={() => {
                      setUnidadeSelecionada(unidade);
                    }}>
                    {unidade.titulo}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            ''
          )}

          {unidadeSelecionada && (
            <div>
              <p className="mt-4 text-center">
                Você está prestes a solicitar socorro para um dos vigilantes de
                plantão.
              </p>
              <div className="mt-1 flex  justify-center gap-2">
                <Button onClick={handleClickCallForHelp}>Chamar socorro</Button>
                <Button
                  onClick={() => {
                    navigate('/home');
                  }}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
