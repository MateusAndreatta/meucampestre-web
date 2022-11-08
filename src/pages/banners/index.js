import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import BannerRepository from '../../repository/BannerRepository';
import Button from '../../components/buttons/button';

function BannerItem(banner, handleClickEditar) {
  return (
    <div key={banner.id} className="flex flex-col rounded bg-white shadow">
      <img src={banner.urlBanner} className="w-full rounded-t" />
      <div className="px-4 pb-4 pt-2">
        <p>{banner.link ? banner.link : 'Link não cadastrado'}</p>
        <div className="mt-2 flex justify-center">
          <Button onClick={() => handleClickEditar(banner)}>
            Editar banner
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Banners() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const handleClickEditar = (banner) => {
    navigate(`/editar-banner/`, { state: { banner } });
  };

  useEffect(() => {
    BannerRepository.findAll().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Gerenciar banners</h1>
          <Link to="/novo-banner">
            <button className="btn-outline">Novo banner</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.map((banner) => {
            return BannerItem(banner, handleClickEditar);
          })}
        </div>
      </div>
    </div>
  );
}
