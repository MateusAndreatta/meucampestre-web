import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import DotsIcon from '../../components/icons/dotsIcon';
import ProfileIcon from '../../components/icons/profileIcon';
import TrashIcon from '../../components/icons/trashIcon';
import { Link, useNavigate } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import UnityRepository from '../../repository/UnityRepository';
import DataTableBase from '../../components/data-table';
import StatusTag from '../../components/status-tag';
import BookCommunAreaRepository from '../../repository/BookCommunAreaRepository';
import moment from 'moment';

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
            onClick={props.onClickAprovar}>
            <span className="flex flex-col">
              <span>
                <ProfileIcon className="float-left mr-3" />
                Aprovar
              </span>
            </span>
          </a>
          <a
            href="#"
            className="text-md block block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
            role="menuitem"
            onClick={props.onClickRecusar}>
            <span className="flex flex-col">
              <span>
                <TrashIcon className="float-left mr-3" />
                Recusar
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SolicitationsCommunArea() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  function handleClickAprovar(row) {
    BookCommunAreaRepository.update({ status: 'APROVADA' }, row.id).then(() => {
      requestData(requestData);
    });
  }

  function handleClickRecusar(row) {
    BookCommunAreaRepository.update({ status: 'RECUSADA' }, row.id).then(() => {
      requestData(requestData);
    });
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

  function requestData() {
    BookCommunAreaRepository.findAll().then((response) => {
      setData(response);
    });
  }

  useEffect(() => {
    requestData();
  }, []);

  const columns = [
    {
      name: (
        <div>
          <p className="text-lg">Solicitante</p>
          <p className="text-sm text-gray-400">Dia da solicitação</p>
        </div>
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex">
          <div>
            <p>{row.solicitante.nome}</p>
            <small>{moment(row.criadoEm).format('DD/MM/YYYY')}</small>
          </div>
        </div>
      ),
    },
    {
      name: (
        <div>
          <p className="text-lg">Local</p>
          <p className="text-sm text-gray-400">Data do uso</p>
        </div>
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex">
          <div>
            <p>{row.areaComum.titulo}</p>
            <small>{moment(row.dataSolicitacao).format('DD/MM/YYYY')}</small>
          </div>
        </div>
      ),
    },
    {
      name: (
        <div>
          <p className="text-lg">Status</p>
        </div>
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex">
          <StatusTag status={row.status}>{row.status}</StatusTag>
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
            onClickAprovar={() => handleClickAprovar(row)}
            onClickDeletar={() => {
              handleClickDeletar(row);
            }}
            onClickRecusar={() => {
              handleClickRecusar(row);
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
          <h1 className="text-2xl">Solicitações</h1>
        </div>

        <DataTableBase
          columns={columns}
          data={data}
          noTableHead={false}
          responsive={true}
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
