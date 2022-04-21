import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Login from './pages/login';
import Error404 from './pages/erros/error404';
import Home from './pages/home';
import Users from './pages/users';
import NewUser from './pages/new-user';
import Profile from './pages/profile';
import SelectCondo from './pages/select-condo';

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/selecionar-condominio" element={<SelectCondo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/acessos" element={<Users />} />
        <Route path="/novo-acesso" element={<NewUser />} />
        <Route path="/editar-acesso/:documento" element={<NewUser />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
