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

export default function BlockedCpf() {
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
        id: 1,
        nome: 'Fulano de tal',
        documento: '031.456.321-43',
        motivo: 'Acediou moradora em festa.',
      },
    ]);
  }, []);

  const columns = [
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
            <p className="text-base">{row.nome}</p>
            <small className="text-sm text-gray-400">{row.documento}</small>
          </div>
        </div>
      ),
    },
    {
      name: (
        <div>
          <p className="text-lg">Motivo</p>
        </div>
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex">
          <div>
            <p className="text-sm">{row.motivo}</p>
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
      hide: adminEnable ? 0 : 9999999999999999,
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
          <h1 className="text-2xl">CPF Bloqueado</h1>
          {adminEnable && (
            <Link to="/novo-bloqueio-cpf">
              <button className="btn-outline">Bloquear CPF</button>
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
              <p>Nenhum CPF bloqueado no momento</p>
              <br />
            </div>
          }
        />
      </div>
    </div>
  );
}
