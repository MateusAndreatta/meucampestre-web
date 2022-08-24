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
import DataTableBase from '../../components/data-table';
import DotsIcon from '../../components/icons/dotsIcon';
import ProfileIcon from '../../components/icons/profileIcon';
import TrashIcon from '../../components/icons/trashIcon';
import PhotoIcon from '../../components/icons/photoIcon';

function ActionItem(props) {
  return (
    <div className="group flex h-full w-full grow cursor-pointer items-center justify-center">
      <DotsIcon />
      <div className="absolute right-0 z-10 hidden origin-top-right rounded-md bg-white shadow-lg group-hover:block">
        <div
          className="w-40"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          {props.hasPhoto && (
            <div
              className="text-md block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
              role="menuitem"
              onClick={props.onClickFoto}>
              <span className="flex flex-col">
                <span>
                  <PhotoIcon className="float-left mr-3" />
                  Foto
                </span>
              </span>
            </div>
          )}
          <div
            className="text-md block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
            role="menuitem"
            onClick={props.onClickEditar}>
            <span className="flex flex-col">
              <span>
                <ProfileIcon className="float-left mr-3" />
                Editar
              </span>
            </span>
          </div>
          {props.canDelete && (
            <div
              className="text-md block block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
              role="menuitem"
              onClick={props.onClickDeletar}>
              <span className="flex flex-col">
                <span>
                  <TrashIcon className="float-left mr-3" />
                  Deletar
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WaterConsumptionDashboard() {
  const [mainState, setMainState] = useState({});
  const [formStep, setFormStep] = useState(0);
  const [unidades, setUnidades] = useState(SessionData.getUnits());
  const [loading, setLoading] = useState(true);
  const [condoDashboard, setCondoDashboard] = useState({});
  const [userDashboard, setUserDashboard] = useState({});
  const [condoList, setCondoList] = useState([]);
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
    WaterConsumptionRepository.getCondoValues().then((response) => {
      console.log(response);
      setCondoList(response.leituras);
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

  const a = moment().endOf('month');
  const days = a.diff(moment(), 'days');

  const percentage = (condoDashboard.leituras / condoDashboard.unidades) * 100;
  console.log(percentage);

  const columns = [
    {
      name: 'Unidade',
      selector: (row) => row.unidade.titulo,
      cell: (row) => (
        <div>
          <p>{row.unidade.titulo}</p>
        </div>
      ),
    },
    {
      name: 'Consumo',
      selector: (row) => row.consumo,
      cell: (row) => (
        <div>
          <p>{row.consumo}m³</p>
        </div>
      ),
    },
    {
      name: 'Valor',
      selector: (row) => row.valor,
      cell: (row) => (
        <div>
          <p>{formatarValorMonetario(row.valor)}</p>
        </div>
      ),
    },
    {
      name: 'Leitura',
      selector: (row) => row.valorLido,
      cell: (row) => (
        <div>
          <p>{row.valorLido ? row.valorLido : '-'}</p>
        </div>
      ),
    },
    {
      grow: 0,
      right: false,
      center: true,
      sortable: false,
      width: '55px',
      compact: true,
      cell: (row) => {
        return (
          <ActionItem
            canDelete={!!row.idLeitura}
            hasPhoto={!!row.foto}
            onClickFoto={() => {
              handleClickFoto(row);
            }}
            onClickDeletar={() => {
              handleClickDeletar(row);
            }}
            onClickEditar={() => {
              // handleClickEditar(row);
            }}
          />
        );
      },
    },
  ];

  const handleClickFoto = (row) => {
    const fileWindow = window.open();
    fileWindow.location.href = row.foto;
  };

  const handleClickDeletar = (row) => {
    WaterConsumptionRepository.remove(row.idLeitura).then(() => {});
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
        <DataTableBase
          columns={columns}
          data={condoList}
          noTableHead={false}
          noDataComponent={
            <div>
              <br />
              <p>Nenhuma unidade encontrada</p>
              <br />
            </div>
          }
        />
      </div>
    </div>
  );
}
