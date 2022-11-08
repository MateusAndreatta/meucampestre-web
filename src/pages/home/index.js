import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Banner from '../../components/banner';
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
import Translator from '../../components/i18n/Translator';
import ExclamationTriangleIcon from '../../components/icons/exclamationTriangle';
import PhotoIcon from '../../components/icons/photoIcon';

export default function Home() {
  const roles = SessionData.getRoles();
  const units = SessionData.getUnits();
  const [sindicoOuPorteiro, setSindicoOuPorteiro] = useState(
    roles.includes(ROLES.PORTEIRO) || roles.includes(ROLES.SINDICO)
  );

  const [sindico, setSindico] = useState(roles.includes(ROLES.SINDICO));

  const [sosEnabled, setSosEnabled] = useState(units.length > 0);

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
            <Card icon={UsersIcon} title={<Translator path="home.users" />} />
          </Link>
          <Link to="/perfil-condominio">
            <Card icon={HomeIcon} title={<Translator path="home.condo" />} />
          </Link>
          <Link to="/unidades">
            <Card
              icon={CollectionIcon}
              title={<Translator path="home.units" />}
            />
          </Link>
          <Link to="/consumo-hidrico">
            <Card
              icon={ChartBarIcon}
              title={<Translator path="home.waterConsumption" />}
            />
          </Link>
          <Link to="/areas-comuns">
            <Card
              icon={CalendarIcon}
              title={<Translator path="home.commonAreas" />}
            />
          </Link>
          {sindicoOuPorteiro && (
            <Link to="/portaria">
              <Card
                icon={LockClosedIcon}
                title={<Translator path="home.visitsPanel" />}
              />
            </Link>
          )}
          {sindicoOuPorteiro && (
            <Link to="/cpf-bloqueado">
              <Card
                icon={NoSymbolIcon}
                title={<Translator path="home.cpfBlocked" />}
              />
            </Link>
          )}
          <Link to="/visitas">
            <Card
              icon={IdentificationIcon}
              title={<Translator path="home.visists" />}
            />
          </Link>
          {sosEnabled && (
            <Link to="/chamado-sos">
              <Card
                icon={ExclamationTriangleIcon}
                title={<Translator path="home.sos" />}
              />
            </Link>
          )}
          {sindico && (
            <Link to="/banners">
              <Card
                icon={PhotoIcon}
                title={<Translator path="home.banners" />}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
