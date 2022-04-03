import React from 'react';
import Navbar from '../../components/navbar';
import { Banner } from '../../components/banner';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Banner />
      </div>
    </div>
  );
}
