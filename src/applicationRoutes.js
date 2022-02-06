import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import App from './App';
import Erro404 from './pages/erros/erro404';

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
