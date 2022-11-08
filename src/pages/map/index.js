import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import SessionData from '../../utils/sessionData';
import Button from '../../components/buttons/button';
import MapaRepository from '../../repository/MapaRepository';
import { ROLES } from '../../utils/Constants';

export default function Map() {
  const navigate = useNavigate();
  const roles = SessionData.getRoles();
  const [adminEnable, setAdminEnable] = useState(roles.includes(ROLES.SINDICO));
  const [data, setData] = useState(null);

  useEffect(() => {
    MapaRepository.findAll()
      .then((response) => {
        console.log(response);
        if (response.urlMapa) {
          setData(response);
        } else {
          if (adminEnable) {
            navigate('/novo-mapa');
          } else {
            navigate('/home');
          }
        }
      })
      .catch((error) => {
        if (adminEnable) {
          navigate('/novo-mapa');
        } else {
          Toaster.showWarning('Não possui mapa cadastrado');
          navigate('/home');
        }
      });
  }, []);

  if (!data) {
    return null;
  }

  const handleShare = () => {
    const img = document.getElementById('imgMapa');
    console.log(img);

    fetch(img.src)
      .then((res) => res.blob())
      .then(async (blob) => {
        const file = new File([blob], 'mapa.png', blob);
        console.log(file);
        const data = {
          files: [file],
          title: 'Image',
          text: 'image',
        };
        try {
          await navigator.share(data);
        } catch (err) {
          Toaster.showError('Não foi possível compartilhar o mapa');
          console.error(err);
        }
      });
  };

  return (
    <div>
      <div className="md:container md:mx-auto">
        <img id={'imgMapa'} src={data.urlMapa} className="w-full" />
        <div className="relative bottom-0 w-full py-8">
          <div className="mx-2 flex justify-center gap-2">
            <Button fullWidth={true} onClick={() => handleShare()}>
              Compartilhar
            </Button>
            {adminEnable && (
              <Button fullWidth={true} onClick={() => navigate('/novo-mapa')}>
                Editar
              </Button>
            )}
            <Button fullWidth={true} onClick={() => navigate('/home')}>
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
