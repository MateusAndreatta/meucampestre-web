import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import DotsIcon from '../../components/icons/dotsIcon';
import ProfileIcon from '../../components/icons/profileIcon';
import TrashIcon from '../../components/icons/trashIcon';
import LockClosedIcon from '../../components/icons/lockClosedIcon';
import { Link, useNavigate } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import UserRepository from '../../repository/UserRepository';
import DataTableBase from '../../components/data-table';

//TODO: O DataTable deve virar um Componente externo para ser reaproveitado
//https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page

//TODO: no ActionItem corrigir o dropdown no mobile
//TODO: Adicionar paginação customizada
//TODO: Adicionar search bar

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

export default function Users() {
  const [filterCondomino, setFilterCondomino] = useState(false);
  const [filterConselheiro, setFilterConselheiro] = useState(false);
  const [filterPorteiro, setFilterPorteiro] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [dataFromDatabase, setDataFromDatabase] = useState([]);

  function handleClickEditar(row) {
    navigate(`/editar-acesso/${row.documento}`);
  }
  function handleClickDeletar(row) {
    UserRepository.remove(row.documento).then(() => {
      UserRepository.findAll().then((response) => {
        Toaster.showInfo('Acesso do usuário removido do condomínio.');
        setDataToStates(response);
      });
    });
  }

  function setDataToStates(data) {
    let filteredData = data.filter((e) => e.id !== SessionData.getUser().id);
    setDataFromDatabase(filteredData);
    setData(filteredData);
  }

  useEffect(() => {
    UserRepository.findAll().then((response) => {
      setDataToStates(response);
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
      roles.push(ROLES.MORADOR);
    }
    if (filterConselheiro) {
      roles.push(ROLES.CONSELHEIRO);
    }
    if (filterPorteiro) {
      roles.push(ROLES.PORTEIRO);
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
        case ROLES.SINDICO:
          if (rolesString !== '') {
            rolesString += ' & ';
          }
          rolesString += 'Síndico';
          break;
        case ROLES.MORADOR:
          if (rolesString !== '') {
            rolesString += ' & ';
          }
          rolesString += 'Condômino';
          break;
        case ROLES.PORTEIRO:
          if (rolesString !== '') {
            rolesString += ' & ';
          }
          rolesString += 'Porteiro';
          break;
        case ROLES.CONSELHEIRO:
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

        <DataTableBase
          columns={columns}
          data={data}
          noDataComponent={
            <div>
              <br />
              <p>Nenhum acesso encontrado</p>
              <br />
            </div>
          }
        />
      </div>
    </div>
  );
}
