import React, { useEffect } from 'react';
import 'moment/locale/pt-br';
import Timer from '../timer';
import Button from '../buttons/button';
import { collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function SosAlert(props) {
  useEffect(() => {}, []);

  const handleClick = async () => {
    const querySnapshot = await getDocs(collection(db, 'sos'));
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  if (props.unidades === undefined || props.unidades.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-0 z-50 h-full w-full bg-black bg-opacity-40 shadow-md">
      <div className="flex h-full w-full items-center justify-center self-center p-8">
        <div className="flex max-h-full w-full max-w-md flex-col overflow-hidden rounded bg-white">
          <div className="border-b p-4 text-center">
            🚨 Alerta de emergência 🚨
          </div>

          <div className=" p-4">
            <div className="space-y-4">
              <p>
                Houve uma solicitação de emergência para a(s) unidade(s) abaixo:
              </p>

              <div className="flex gap-2">
                {props.unidades &&
                  props.unidades.map((unidade) => (
                    <div key={unidade.id}>
                      <div className="rounded bg-gray-400 p-2 text-white">
                        {unidade.titulo}
                      </div>
                    </div>
                  ))}
              </div>

              <p>
                Por favor vá imediatamente até o local e verifique o que está
                acontecendo.
              </p>
              <p></p>
            </div>
          </div>

          <div className="flex justify-between border-t p-4">
            <div className="mt-2">
              <Timer />
            </div>

            <Button onClick={handleClick}>Chamado atendido</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
