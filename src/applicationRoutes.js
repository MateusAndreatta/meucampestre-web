import React from 'react';
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';

import Login from './pages/login';
import Error404 from './pages/erros/error404';
import Home from './pages/home';
import Users from './pages/users';
import NewUser from './pages/new-user';
import Profile from './pages/profile';
import SelectCondo from './pages/select-condo';
import SessionData from './utils/sessionData';

function loggedIn() {
  return SessionData.hasFullData();
}
function PrivateOutlet() {
  return loggedIn() ? <Outlet /> : <Navigate to="/" />;
}

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/selecionar-condominio" element={<PrivateOutlet />}>
          <Route path="" element={<SelectCondo />} />
        </Route>
        <Route path="/home" element={<PrivateOutlet />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="/acessos" element={<PrivateOutlet />}>
          <Route path="" element={<Users />} />
        </Route>
        <Route path="/novo-acesso" element={<PrivateOutlet />}>
          <Route path="" element={<NewUser />} />
        </Route>
        <Route path="/editar-acesso/:documento" element={<PrivateOutlet />}>
          <Route path="" element={<NewUser />} />
        </Route>
        <Route path="/perfil" element={<PrivateOutlet />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
