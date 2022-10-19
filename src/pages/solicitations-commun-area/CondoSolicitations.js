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
import Tooltip from '../../components/tooltip';
import BookCommunAreaRepository from '../../repository/BookCommunAreaRepository';
import moment from 'moment';
import Modal from 'react-modal';
import CloseIcon from '../../components/icons/closeIcon';

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

export default function CondoSolicitations() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [justificativa, setJustificativa] = useState('');

  function handleJustificativaChange(event) {
    const value = event.target.value;
    setJustificativa(value);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModalData(null);
    setJustificativa('');
  }

  function handleClickAprovar(row) {
    BookCommunAreaRepository.update({ status: 'APROVADA' }, row.id).then(() => {
      requestData(requestData);
    });
  }

  function handleClickRecusar(row) {
    openModal();
    setModalData(row);
  }

  function handleClickRecusarModal(data) {
    console.log(data);
    BookCommunAreaRepository.update(
      { status: 'RECUSADA', justificativa: justificativa },
      data.id
    ).then(() => {
      requestData(requestData);
      closeModal();
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
          {row.justificativa && (
            <Tooltip message={row.justificativa}>
              <StatusTag status={row.status}>{row.status}</StatusTag>
            </Tooltip>
          )}
          {!row.justificativa && (
            <StatusTag status={row.status}>{row.status}</StatusTag>
          )}
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
            onClickRecusar={() => {
              handleClickRecusar(row);
            }}
          />
        );
      },
    },
  ];

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      <div className="my-8 flex justify-between">
        <h1 className="text-2xl">Solicitações dos condôminos</h1>
      </div>

      <DataTableBase
        columns={columns}
        data={data}
        noTableHead={false}
        responsive={true}
        noDataComponent={
          <div>
            <br />
            <p>Nenhuma solicitação encontrada</p>
            <br />
          </div>
        }
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal para recusar reserva">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium  ">Recusar reserva</h2>
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        {modalData && (
          <div className="text-base ">
            Informe a justificativa para recusar a solicitação de{' '}
            {modalData.solicitante.nome} que deseja utilizar o espaço{' '}
            {modalData.areaComum.titulo} no dia{' '}
            {moment(modalData.dataSolicitacao).format('DD/MM/YYYY')}
          </div>
        )}

        <textarea
          value={justificativa}
          onChange={handleJustificativaChange}
          className="input w-full"></textarea>
        <div className="flex flex-row-reverse">
          <button
            className="btn-outline"
            onClick={() => {
              handleClickRecusarModal(modalData);
            }}>
            Recusar
          </button>
        </div>
      </Modal>
    </div>
  );
}
