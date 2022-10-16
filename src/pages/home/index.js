import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { Banner } from '../../components/banner';
import Card from '../../components/card';
import { Link, Navigate } from 'react-router-dom';
import UsersIcon from '../../components/icons/usersIcon';
import CollectionIcon from '../../components/icons/collection';
import HomeIcon from '../../components/icons/home';
import ChartBarIcon from '../../components/icons/ChartBarIcon';
import CalendarIcon from '../../components/icons/calendarIcon';
import LockClosedIcon from '../../components/icons/lockClosedIcon';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import NoSymbolIcon from '../../components/icons/NoSymbolIcon';
import IdentificationIcon from '../../components/icons/identificationIcon';

export default function Home() {
  const roles = SessionData.getRoles();
  const [sindicoOuPorteiro, setSindicoOuPorteiro] = useState(
    roles.includes(ROLES.PORTEIRO) || roles.includes(ROLES.SINDICO)
  );

  if (roles.length === 1 && roles.includes(ROLES.PORTEIRO)) {
    return <Navigate to="/portaria" replace />;
  }

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
          <Link to="/consumo-hidrico">
            <Card icon={ChartBarIcon} title="Consumo hídrico" />
          </Link>
          <Link to="/areas-comuns">
            <Card icon={CalendarIcon} title="Áreas comuns" />
          </Link>
          {sindicoOuPorteiro && (
            <Link to="/portaria">
              <Card icon={LockClosedIcon} title="Portaria" />
            </Link>
          )}
          {sindicoOuPorteiro && (
            <Link to="/cpf-bloqueado">
              <Card icon={NoSymbolIcon} title="CPF Bloqueado" />
            </Link>
          )}
          <Link to="/visitas">
            <Card icon={IdentificationIcon} title="Visitas e Prestadores" />
          </Link>
        </div>
      </div>
    </div>
  );
}
