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
import WaterConsumptionRepository from '../../repository/WaterConsumptionRepository';

export default function WaterConsumptionDashboard() {
  const [mainState, setMainState] = useState({});
  const [formStep, setFormStep] = useState(0);
  const [unidades, setUnidades] = useState(SessionData.getUnits());
  const [loading, setLoading] = useState(true);
  const [condoDashboard, setCondoDashboard] = useState({});
  const [userDashboard, setUserDashboard] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Somenete realizar se o usuario for sindico!
    WaterConsumptionRepository.getCondoDashboard(moment().format('M')).then(
      (response) => {
        console.log(response);
        setCondoDashboard(response);
      }
    );
    console.log(SessionData.getUser());
    WaterConsumptionRepository.getUserDashboard(
      SessionData.getUser().documento
    ).then((response) => {
      console.log(response);
      setUserDashboard(response);
    });
  }, []);

  const formatarValorMonetario = (valor) => {
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

  const a = moment().endOf('month');
  const days = a.diff(moment(), 'days');

  const percentage = (condoDashboard.leituras / condoDashboard.unidades) * 100;
  console.log(percentage);

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
          />
          <DashboardCard
            icon={DolarIcon}
            bgColor={'bg-yellow-100'}
            label={'Valor mês'}
            value={`${formatarValorMonetario(userDashboard.valor)}`}
          />
          <DashboardCard
            icon={WaterDropIcon}
            bgColor={'bg-sky-300'}
            label={'Consumo médio'}
            value={`${userDashboard.consumoMedio}m³`}
          />
          <DashboardCard
            icon={DolarIcon}
            bgColor={'bg-yellow-100'}
            label={'Valor médio'}
            value={`${formatarValorMonetario(userDashboard.valorMedio)}`}
          />
        </div>
        <h1 className="my-8 text-2xl">Consumo condomínio</h1>
        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            icon={DolarIcon}
            bgColor={'bg-yellow-100'}
            label={'Valor acumulado'}
            value={`${formatarValorMonetario(condoDashboard.valor)}`}
          />
          <DashboardCard
            icon={WaterDropIcon}
            bgColor={'bg-sky-300'}
            label={'Consumo total'}
            value={`${condoDashboard.consumo}m³`}
          />
          <DashboardCardProgress
            icon={LupaIcon}
            bgColor={'bg-green-400'}
            label={'Leituras realizadas'}
            percentage={percentage}
            description={`${days} dias para fechar o mês`}
          />
        </div>
      </div>
    </div>
  );
}
