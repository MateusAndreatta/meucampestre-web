import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Login from './pages/login';
import Error404 from './pages/erros/error404';
import Home from './pages/home';

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
