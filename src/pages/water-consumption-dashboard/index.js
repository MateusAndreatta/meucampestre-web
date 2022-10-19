import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import moment from 'moment';
import 'moment/locale/pt-br';
import SessionData from '../../utils/sessionData';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DashboardCard from '../../components/dashboard-card';
import DolarIcon from '../../components/icons/dolarIcon';
import WaterDropIcon from '../../components/icons/waterDropIcon';
import WaterConsumptionRepository from '../../repository/WaterConsumptionRepository';
import CondoDashboard from './CondoDashboard';
import { ROLES } from '../../utils/Constants';

export default function WaterConsumptionDashboard() {
  const [userDashboard, setUserDashboard] = useState({});
  const roles = SessionData.getRoles();
  const [loading, setLoading] = useState(true);
  const [condoDashboardEnable, setCondoDashboardEnable] = useState(
    roles.includes(ROLES.SINDICO)
  );
  useEffect(() => {
    WaterConsumptionRepository.getUserDashboard().then((response) => {
      setUserDashboard(response);
      setLoading(false);
    });
  }, []);

  const formatarValorMonetario = (valor) => {
    if (valor == null) {
      return '0';
    }
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const labels = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Consumo',
        data: userDashboard.grafico,
        backgroundColor: '#0ea5e9',
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Consumo hídrico</h1>
          <Link to="/nova-leitura">
            <button className="btn-outline">Nova leitura</button>
          </Link>
        </div>
        <div className="dashboard-card p-5">
          <Bar options={options} data={data} />
        </div>
        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            icon={WaterDropIcon}
            bgColor={'bg-sky-300'}
            label={'Consumo mês'}
            value={`${userDashboard.consumo}m³`}
            loading={loading}
          />
          <DashboardCard
            icon={DolarIcon}
            bgColor={'bg-yellow-100'}
            label={'Valor mês'}
            value={`${formatarValorMonetario(userDashboard.valor)}`}
            loading={loading}
          />
          <DashboardCard
            icon={WaterDropIcon}
            bgColor={'bg-sky-300'}
            label={'Consumo médio'}
            value={`${userDashboard.consumoMedio}m³`}
            loading={loading}
          />
          <DashboardCard
            icon={DolarIcon}
            bgColor={'bg-yellow-100'}
            label={'Valor médio'}
            value={`${formatarValorMonetario(userDashboard.valorMedio)}`}
            loading={loading}
          />
        </div>
        {condoDashboardEnable && <CondoDashboard />}
      </div>
    </div>
  );
}
