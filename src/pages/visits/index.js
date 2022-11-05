import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import DotsIcon from '../../components/icons/dotsIcon';
import ProfileIcon from '../../components/icons/profileIcon';
import TrashIcon from '../../components/icons/trashIcon';
import { Link, useNavigate } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import DataTableBase from '../../components/data-table';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import WrenchScrewdriverIcon from '../../components/icons/WrenchScrewdriverIcon';
import VisitsRepository from '../../repository/VisitsRepository';
import moment from 'moment/moment';

function ActionItem(props) {
  return (
    // TODO não tem necessidade de usar a tag <a>
    <div className="group flex h-full w-full grow cursor-pointer items-center justify-center hover:bg-gray-500">
      <DotsIcon />
      <div className="absolute right-0 z-10 hidden origin-top-right rounded-md bg-white shadow-lg group-hover:block">
        <div
          className="w-40"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          <div
            className="text-md block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
            onClick={props.onClickEditar}>
            <span className="flex flex-col">
              <span>
                <ProfileIcon className="float-left mr-3" />
                Editar
              </span>
            </span>
          </div>
          <div
            className="text-md block block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
            onClick={props.onClickDeletar}>
            <span className="flex flex-col">
              <span>
                <TrashIcon className="float-left mr-3" />
                Deletar
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Visits() {
  const navigate = useNavigate();

  const roles = SessionData.getRoles();
  const [adminEnable, setAdminEnable] = useState(roles.includes(ROLES.SINDICO));

  const [data, setData] = useState([]);

  function handleClickEditar(row) {
    navigate(`/visita/${row.id}`);
  }
  function handleClickDeletar(row) {
    VisitsRepository.remove(row.id).then((response) => {
      VisitsRepository.findAllForLoggedUser().then((response) => {
        setData(response);
        Toaster.showInfo('Visita removida!');
      });
    });
  }

  useEffect(() => {
    VisitsRepository.findAllForLoggedUser().then((response) => {
      setData(response);
    });
  }, []);

  const columns = [
    {
      grow: 0,
      right: false,
      center: true,
      sortable: false,
      width: '55px',
      compact: true,
      cell: (row) => {
        return (
          <span className="flex flex-col">
            <span>
              {row.tipo === 'PRESTADOR_DE_SERVICO' ? (
                <WrenchScrewdriverIcon />
              ) : (
                <ProfileIcon />
              )}
            </span>
          </span>
        );
      },
    },
    {
      name: (
        <div>
          <p className="text-lg">Nome</p>
          <p className="text-sm text-gray-400">Documento</p>
        </div>
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex">
          <div>
            <p className="text-base">{row.nomeCompleto}</p>
            <small className="text-sm text-gray-400">{row.documento}</small>
          </div>
        </div>
      ),
    },
    {
      name: (
        <div>
          <p className="text-lg">Período</p>
        </div>
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex">
          <div>
            <p className="text-base">
              {row.permanente
                ? 'Permanente'
                : moment(row.periodoInicio).format('DD/MM/YYYY') +
                  ' - ' +
                  moment(row.periodoFim).format('DD/MM/YYYY')}
            </p>
          </div>
        </div>
      ),
    },
    {
      name: (
        <div>
          <p className="text-lg">Observação</p>
        </div>
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex">
          <div>
            <p className="text-sm">{row.observacao}</p>
          </div>
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
            onClickDeletar={() => {
              handleClickDeletar(row);
            }}
            onClickEditar={() => {
              handleClickEditar(row);
            }}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Visitas e Prestadores de serviço</h1>
          <Link to="/nova-visita">
            <button className="btn-outline">
              Nova visita/prestador de serviço
            </button>
          </Link>
        </div>

        <DataTableBase
          columns={columns}
          data={data}
          noTableHead={false}
          noDataComponent={
            <div>
              <br />
              <p>Nenhuma visita cadastrada</p>
              <br />
            </div>
          }
        />
      </div>
    </div>
  );
}
