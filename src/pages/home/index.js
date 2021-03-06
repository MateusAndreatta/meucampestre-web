import React from 'react';
import Navbar from '../../components/navbar';
import { Banner } from '../../components/banner';
import Card from '../../components/card';
import { Link } from 'react-router-dom';
import UsersIcon from '../../components/icons/usersIcon';
import CollectionIcon from '../../components/icons/collection';
import HomeIcon from '../../components/icons/home';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Banner />
        <div className="my-4 grid grid-cols-2 gap-8 px-2 md:grid-cols-3 lg:grid-cols-4">
          <Link to="/acessos">
            <Card icon={UsersIcon} title="Acessos" />
          </Link>
          <Link to="/perfil-condominio">
            <Card icon={HomeIcon} title="Condomínio" />
          </Link>
          <Link to="/unidades">
            <Card icon={CollectionIcon} title="Unidades" />
          </Link>
        </div>
      </div>
    </div>
  );
}
