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
import CondoProfile from './pages/condo-profile';
import Units from './pages/units';
import NewUnit from './pages/new-unit';
import NewWaterConsumption from './pages/new-water-consumption';
import WaterConsumptionDashboard from './pages/water-consumption-dashboard';

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
        <Route path="/selecionar-condominio" element={<SelectCondo />} />
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
        <Route path="/perfil-condominio" element={<PrivateOutlet />}>
          <Route path="" element={<CondoProfile />} />
        </Route>
        <Route path="/unidades" element={<PrivateOutlet />}>
          <Route path="" element={<Units />} />
        </Route>
        <Route path="/nova-unidade" element={<PrivateOutlet />}>
          <Route path="" element={<NewUnit />} />
        </Route>
        <Route path="/editar-unidade/:id" element={<PrivateOutlet />}>
          <Route path="" element={<NewUnit />} />
        </Route>
        <Route path="/nova-leitura" element={<PrivateOutlet />}>
          <Route path="" element={<NewWaterConsumption />} />
        </Route>
        <Route path="/consumo-hidrico" element={<PrivateOutlet />}>
          <Route path="" element={<WaterConsumptionDashboard />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
