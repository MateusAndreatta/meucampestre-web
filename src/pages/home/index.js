import React from 'react';
import Navbar from '../../components/navbar';
import { Banner } from '../../components/banner';
import Card from '../../components/card';
import UsersIcon from '../../components/icons/usersIcon';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Banner />
        <div className="my-4 grid grid-cols-2 gap-8 px-2 md:grid-cols-3 lg:grid-cols-4">
          <Card icon={UsersIcon} title="Acessos" />
        </div>
      </div>
    </div>
  );
}
