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
import DashboardCardProgress from '../../components/dashboard-card-progress';
import LupaIcon from '../../components/icons/lupaIcon';

export default function WaterConsumptionDashboard() {
  const [mainState, setMainState] = useState({});
  const [formStep, setFormStep] = useState(0);
  const [unidades, setUnidades] = useState(SessionData.getUnits());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {}, []);

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
        data: labels.map(() => Math.random() * 2),
        backgroundColor: '#0ea5e9',
      },
    ],
  };

  const a = moment().endOf('month');
  const days = a.diff(moment(), 'days');

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
            value={'43m³'}
          />
          <DashboardCard
            icon={DolarIcon}
            bgColor={'bg-yellow-200'}
            label={'Valor mês'}
            value={'R$ 58,00'}
          />
          <DashboardCard
            icon={WaterDropIcon}
            bgColor={'bg-sky-300'}
            label={'Consumo médio'}
            value={'48m³'}
          />
          <DashboardCard
            icon={DolarIcon}
            bgColor={'bg-yellow-200'}
            label={'Valor médio'}
            value={'R$60,00'}
          />
        </div>
        <h1 className="my-8 text-2xl">Consumo condomínio</h1>
        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            icon={DolarIcon}
            bgColor={'bg-yellow-200'}
            label={'Valor acumulado'}
            value={'R$ 12.433,00'}
          />
          <DashboardCard
            icon={WaterDropIcon}
            bgColor={'bg-sky-300'}
            label={'Consumo total'}
            value={'4304m³'}
          />
          <DashboardCardProgress
            icon={LupaIcon}
            bgColor={'bg-green-400'}
            label={'Leituras realizadas'}
            percentage={75}
            description={`${days} dias para fechar o mês`}
          />
        </div>
      </div>
    </div>
  );
}
