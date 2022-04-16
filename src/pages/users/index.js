import React from 'react';
import Navbar from '../../components/navbar';
import DataTable from 'react-data-table-component';
import DotsIcon from '../../components/icons/dotsIcon';
import ProfileIcon from '../../components/icons/profileIcon';
import TrashIcon from '../../components/icons/trashIcon';
import LockClosedIcon from '../../components/icons/lockClosedIcon';

//TODO: O DataTable deve virar um Componente externo para ser reaproveitado
//https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page

//TODO: no ActionItem corrigir o dropdown no mobile
//TODO: Adicionar paginação customizada
//TODO: Adicionar search bar
//TODO: Adicionar filtros por roles

function ActionItem(props) {
  return (
    <div
      onClick={props.onClick}
      className="group flex h-full w-full grow cursor-pointer items-center justify-center hover:bg-gray-500">
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
            role="menuitem">
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
            role="menuitem">
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

function handleClick(title) {
  console.log(title);
}

export default function Users() {
  const columns = [
    {
      name: 'Usuário',
      selector: (row) => row.nome,
      cell: (row) => (
        <div className="flex">
          <img
            alt="Perfil"
            src={row.urlFoto}
            className="mr-2 h-8 w-8 cursor-pointer rounded-full bg-gray-500 object-cover"
          />
          <div>
            <p>{row.nome}</p>
            <small>{row.roles}</small>
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
            onClick={() => {
              handleClick(row.nome);
            }}></ActionItem>
        );
      },
    },
  ];

  const data = [
    {
      nome: 'Darrell Steward',
      urlFoto: 'https://i.pravatar.cc/300?1',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Jacob Jones',
      urlFoto: 'https://i.pravatar.cc/300?2',
      roles: 'Condômino',
    },
    {
      nome: 'Kristin Watson',
      urlFoto: 'https://i.pravatar.cc/300?3',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Arlene McCoy',
      urlFoto: 'https://i.pravatar.cc/300?4',
      roles: 'Porteiro',
    },
    {
      nome: 'Dianne Russell',
      urlFoto: 'https://i.pravatar.cc/300?5',
      roles: 'Condômino',
    },
    {
      nome: 'Cameron Williamson',
      urlFoto: 'https://i.pravatar.cc/300?6',
      roles: 'Condômino',
    },
    {
      nome: 'Guy Hawkins',
      urlFoto: 'https://i.pravatar.cc/300?7',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Darrell Steward',
      urlFoto: 'https://i.pravatar.cc/300?1',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Jacob Jones',
      urlFoto: 'https://i.pravatar.cc/300?2',
      roles: 'Condômino',
    },
    {
      nome: 'Kristin Watson',
      urlFoto: 'https://i.pravatar.cc/300?3',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Arlene McCoy',
      urlFoto: 'https://i.pravatar.cc/300?4',
      roles: 'Porteiro',
    },
    {
      nome: 'Dianne Russell',
      urlFoto: 'https://i.pravatar.cc/300?5',
      roles: 'Condômino',
    },
    {
      nome: 'Cameron Williamson',
      urlFoto: 'https://i.pravatar.cc/300?6',
      roles: 'Condômino',
    },
    {
      nome: 'Guy Hawkins',
      urlFoto: 'https://i.pravatar.cc/300?7',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Darrell Steward',
      urlFoto: 'https://i.pravatar.cc/300?1',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Jacob Jones',
      urlFoto: 'https://i.pravatar.cc/300?2',
      roles: 'Condômino',
    },
    {
      nome: 'Kristin Watson',
      urlFoto: 'https://i.pravatar.cc/300?3',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Arlene McCoy',
      urlFoto: 'https://i.pravatar.cc/300?4',
      roles: 'Porteiro',
    },
    {
      nome: 'Dianne Russell',
      urlFoto: 'https://i.pravatar.cc/300?5',
      roles: 'Condômino',
    },
    {
      nome: 'Cameron Williamson',
      urlFoto: 'https://i.pravatar.cc/300?6',
      roles: 'Condômino',
    },
    {
      nome: 'Guy Hawkins',
      urlFoto: 'https://i.pravatar.cc/300?7',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Darrell Steward',
      urlFoto: 'https://i.pravatar.cc/300?1',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Jacob Jones',
      urlFoto: 'https://i.pravatar.cc/300?2',
      roles: 'Condômino',
    },
    {
      nome: 'Kristin Watson',
      urlFoto: 'https://i.pravatar.cc/300?3',
      roles: 'Condômino & Conselho',
    },
    {
      nome: 'Arlene McCoy',
      urlFoto: 'https://i.pravatar.cc/300?4',
      roles: 'Porteiro',
    },
    {
      nome: 'Dianne Russell',
      urlFoto: 'https://i.pravatar.cc/300?5',
      roles: 'Condômino',
    },
    {
      nome: 'Cameron Williamson',
      urlFoto: 'https://i.pravatar.cc/300?6',
      roles: 'Condômino',
    },
    {
      nome: 'Guy Hawkins',
      urlFoto: 'https://i.pravatar.cc/300?7',
      roles: 'Condômino & Conselho',
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
          <button className="btn-outline">Novo acesso</button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          noTableHead={true}
          responsive={false}
          customStyles={customStyles}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </div>
  );
}
