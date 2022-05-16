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
          <a
            href="#"
            className="text-md block block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
            role="menuitem">
            <span className="flex flex-col">
              <span>
                <LockClosedIcon className="float-left mr-3" />
                Redefinir Senha
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

export default function Users() {
  const [filterCondomino, setFilterCondomino] = useState(false);
  const [filterConselheiro, setFilterConselheiro] = useState(false);
  const [filterPorteiro, setFilterPorteiro] = useState(false);
  const token = SessionData.getToken();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [dataFromDatabase, setDataFromDatabase] = useState([]);

  function handleClickEditar(row) {
    navigate(`/editar-acesso/${row.documento}`);
  }
  function handleClickDeletar(row) {
    deleteUser(token, row.documento).then((response) => {
      getDataFromApi(token).then((response) => {
        Toaster.showInfo('Acesso do usuário removido do condomínio.');
        setDataFromDatabase(response.data.moradores);
        setData(response.data.moradores);
      });
    });
  }

  useEffect(() => {
    getDataFromApi(token).then((response) => {
      setDataFromDatabase(response.data.moradores);
      setData(response.data.moradores);
    });
  }, []);

  useEffect(() => {
    updateData();
  }, [filterCondomino, filterConselheiro, filterPorteiro]);

  const filterByRole = (roles) => {
    if (roles && roles.length > 0) {
      const filteredData = dataFromDatabase.filter((user) => {
        let userRoles = user.tipoDePerfil;
        let filterReturn = false;
        roles.forEach((role) => {
          userRoles.forEach((userRole) => {
            if (userRole === role) {
              filterReturn = true;
            }
          });
        });
        return filterReturn;
      });

      setData(filteredData);
    } else {
      setData(dataFromDatabase);
    }
  };

  const updateData = () => {
    let roles = [];
    if (filterCondomino) {
      roles.push('ROLE_MORADOR');
    }
    if (filterConselheiro) {
      roles.push('ROLE_CONSELHEIRO');
    }
    if (filterPorteiro) {
      roles.push('ROLE_PORTEIRO');
    }
    filterByRole(roles);
  };

  const handleChangeCondomino = () => {
    setFilterCondomino(!filterCondomino);
  };

  const handleChangeConselheiro = () => {
    setFilterConselheiro(!filterConselheiro);
  };

  const handleChangePorteiro = () => {
    setFilterPorteiro(!filterPorteiro);
  };
  //TODO: Essa função pode ser de uma classe utils
  const getRolesString = (roles) => {
    let rolesString = '';
    roles.forEach((role) => {
      switch (role) {
        case 'ROLE_SINDICO':
          if (rolesString !== '') {
            rolesString += ' & ';
          }
          rolesString += 'Síndico';
          break;
        case 'ROLE_MORADOR':
          if (rolesString !== '') {
            rolesString += ' & ';
          }
          rolesString += 'Condômino';
          break;
        case 'ROLE_PORTEIRO':
          if (rolesString !== '') {
            rolesString += ' & ';
          }
          rolesString += 'Porteiro';
          break;
        case 'ROLE_CONSELHEIRO':
          if (rolesString !== '') {
            rolesString += ' & ';
          }
          rolesString += 'Conselho';
          break;
        default:
          break;
      }
    });
    return rolesString;
  };

  const columns = [
    {
      name: 'Usuário',
      selector: (row) => row.nome,
      cell: (row) => (
        <div className="flex">
          <img
            alt="Perfil"
            src={
              row.fotoDePerfil || `https://ui-avatars.com/api/?name=${row.nome}`
            }
            className="mr-2 h-8 w-8 cursor-pointer rounded-full bg-gray-500 object-cover"
          />
          <div>
            <p>{row.nome}</p>
            <small>{getRolesString(row.tipoDePerfil)}</small>
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
          <h1 className="text-2xl">Gerenciar acessos</h1>
          <Link to="/novo-acesso">
            <button className="btn-outline">Novo acesso</button>
          </Link>
        </div>

        <div className="flex flex-wrap">
          <label className="mr-6 mb-3 flex items-center space-x-3">
            <input
              type="checkbox"
              name="filterCondominio"
              className="h-6 w-6 appearance-none rounded-md border border-gray-300 bg-white checked:border-transparent checked:bg-blue-500 checked:bg-check focus:outline-none"
              checked={filterCondomino}
              onChange={handleChangeCondomino}
            />
            <span className="font-normal text-gray-700">Condôminos</span>
          </label>
          <label className="mr-6 mb-3 flex items-center space-x-3">
            <input
              type="checkbox"
              name="filterConselheiro"
              className="h-6 w-6 appearance-none rounded-md border border-gray-300 bg-white checked:border-transparent checked:bg-blue-500 checked:bg-check focus:outline-none"
              checked={filterConselheiro}
              onChange={handleChangeConselheiro}
            />
            <span className="font-normal text-gray-700">Conselheiros</span>
          </label>
          <label className="mr-6 mb-3 flex items-center space-x-3">
            <input
              type="checkbox"
              name="filterPorteiro"
              className="h-6 w-6 appearance-none rounded-md border border-gray-300 bg-white checked:border-transparent checked:bg-blue-500 checked:bg-check focus:outline-none"
              checked={filterPorteiro}
              onChange={handleChangePorteiro}
            />
            <span className="font-normal text-gray-700">Porteiros</span>
          </label>
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
              <p>Nenhum acesso encontrado</p>
              <br />
            </div>
          }
          // TODO: Quando refatorar a tabela, já criar um componente de listagem vazia generico
        />
      </div>
    </div>
  );
}
