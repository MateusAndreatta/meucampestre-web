import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import DataTable from 'react-data-table-component';
import DotsIcon from '../../components/icons/dotsIcon';
import ProfileIcon from '../../components/icons/profileIcon';
import TrashIcon from '../../components/icons/trashIcon';
import LockClosedIcon from '../../components/icons/lockClosedIcon';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../../globals';
import { useSelector } from 'react-redux';
import Toaster from '../../utils/ui/toaster';
import SessionData from '../../utils/sessionData';

//TODO: O DataTable deve virar um Componente externo para ser reaproveitado
//https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page

//TODO: no ActionItem corrigir o dropdown no mobile
//TODO: Adicionar paginação customizada
//TODO: Adicionar search bar
//TODO: Adicionar comportamento quando a lista estiver vazia
//TODO: Remover usuario logado da listagem

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

//TODO: Colocar parametro dinamico
function getDataFromApi(token) {
  return axios({
    method: 'GET',
    url: `${API_ENDPOINT}/usuarios/1/usuario`,
    params: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
// TODO mover todos as chamadas do axios para uma classe global de requests
function deleteUser(token, document) {
  return axios({
    method: 'DELETE',
    url: `${API_ENDPOINT}/usuarios/1/usuario/${document}`,
    params: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function Units() {
  const token = SessionData.getToken();
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      id: 1,
      descricao: '',
      endereco: 'Rua pastor alemão',
      titulo: 'Chácara 1',
    },
    {
      id: 2,
      descricao: '',
      endereco: 'Rua Capixaba',
      titulo: 'Chácara 12',
    },
    {
      id: 3,
      descricao: '',
      endereco: 'Rua castor ernesto',
      titulo: 'Chácara 176',
    },
    {
      id: 4,
      descricao: '',
      endereco: 'Rua lemoeiro da paz',
      titulo: 'Chácara 143',
    },
  ]);
  const [dataFromDatabase, setDataFromDatabase] = useState([]);

  function handleClickEditar(row) {
    navigate(`/editar-acesso/${row.documento}`);
  }
  function handleClickDeletar(row) {
    deleteUser(token, row.documento).then((response) => {
      getDataFromApi(token).then((response) => {
        Toaster.showInfo('Acesso do usuário removido do condomínio.');
        // setDataToStates(response.data.moradores);
      });
    });
  }

  useEffect(() => {
    getDataFromApi(token).then((response) => {
      // setDataToStates(response.data.moradores);
    });
  }, []);

  const columns = [
    {
      name: 'Unidade',
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex">
          <div>
            <p>{row.titulo}</p>
            <small>{row.endereco}</small>
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

  const customStyles = {
    table: {
      style: {
        borderWidth: '2px',
        borderColor: 'rgba(0,0,0,.12)',
        borderStyle: 'solid',
        borderRadius: '5px',
        marginBottom: '10px',
      },
    },
    rows: {
      style: {},
    },
    cells: {
      style: {},
    },
    pagination: {
      style: {
        borderWidth: '2px',
        borderColor: 'rgba(0,0,0,.12)',
        borderStyle: 'solid',
        borderRadius: '5px',
        marginBottom: '10px',
      },
    },
  };

  const paginationComponentOptions = {
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
    noRowsPerPage: true,
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Gerenciar unidades</h1>
          <Link to="/novo-acesso">
            <button className="btn-outline">Nova unidade</button>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={data}
          noTableHead={true}
          responsive={false}
          customStyles={customStyles}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent={
            <div>
              <br />
              <p>Nenhuma unidade encontrada</p>
              <br />
            </div>
          }
          // TODO: Quando refatorar a tabela, já criar um componente de listagem vazia generico
        />
      </div>
    </div>
  );
}
