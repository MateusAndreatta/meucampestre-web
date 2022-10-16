import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import DotsIcon from '../../components/icons/dotsIcon';
import ProfileIcon from '../../components/icons/profileIcon';
import TrashIcon from '../../components/icons/trashIcon';
import { Link, useNavigate } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import UnityRepository from '../../repository/UnityRepository';
import DataTableBase from '../../components/data-table';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import WrenchScrewdriverIcon from '../../components/icons/WrenchScrewdriverIcon';
import ArrowDownTrayIcon from '../../components/icons/arrowDownTray';
import ArrowUpTrayIcon from '../../components/icons/arrowUpTrayIcon';

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
          <a
            href="#"
            className="text-md block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
            role="menuitem"
            onClick={props.onClickEditar}>
            <span className="flex flex-col">
              <span>
                <ProfileIcon className="float-left mr-3" />
                Editar
              </span>
            </span>
          </a>
          <a
            href="#"
            className="text-md block block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
            role="menuitem"
            onClick={props.onClickDeletar}>
            <span className="flex flex-col">
              <span>
                <TrashIcon className="float-left mr-3" />
                Deletar
              </span>
            </span>
          </a>
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
    navigate(`/editar-unidade/${row.id}`);
  }
  function handleClickDeletar(row) {
    UnityRepository.remove(row.id)
      .then((response) => {
        UnityRepository.findAll().then((response) => {
          setData(response);
          Toaster.showInfo('Unidade removida!');
        });
      })
      .catch((error) => {
        Toaster.showError('Ocorreu um erro, tente novamente mais tarde!');
      });
  }

  useEffect(() => {
    // UnityRepository.findAll().then((response) => {
    //   setData(response);
    // });
    setData([
      {
        tipo: 'Visita',
        visitante: { nome: 'José da silva', documento: '123.343.543-32' },
        unidades: [{ id: 101, nome: 'Chcara A' }],
        observacao:
          'O empenho em analisar o início da atividade geral de formação de atitudes pode nos levar a considera',
      },
      {
        tipo: 'Prestador de serviço',
        visitante: { nome: 'José da silva', documento: '123.343.543-32' },
        unidades: [
          { id: 103, nome: 'Chcara 33' },
          { id: 104, nome: 'Chcara 35' },
        ],
        observacao: 'Visita de 1 dia',
      },
    ]);
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
              {row.tipo === 'Visita' ? (
                <ProfileIcon />
              ) : (
                <WrenchScrewdriverIcon />
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
            <p className="text-base">{row.visitante.nome}</p>
            <small className="text-sm text-gray-400">
              {row.visitante.documento}
            </small>
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
            <p className="text-base">29/03/2010 - 23/03/2010</p>
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
          {adminEnable && (
            <Link to="/nova-visita">
              <button className="btn-outline">
                Nova visita/prestador de serviço
              </button>
            </Link>
          )}
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
