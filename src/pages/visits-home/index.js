import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import DataTableBase from '../../components/data-table';
import Tooltip from '../../components/tooltip';
import StatusTag from '../../components/status-tag';
import ProfileIcon from '../../components/icons/profileIcon';
import WrenchScrewdriverIcon from '../../components/icons/WrenchScrewdriverIcon';
import ArrowDownTrayIcon from '../../components/icons/arrowDownTray';
import ArrowUpTrayIcon from '../../components/icons/arrowUpTrayIcon';
import Modal from 'react-modal';
import CloseIcon from '../../components/icons/closeIcon';

export default function VisitsHome() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [visitis, setVisits] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    setVisits([
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

  function openModalEntrada(row) {
    setIsOpen(true);
    setModalData({ tipo: 'entrada', date: new Date(), data: row });
  }

  function openModalSaida(row) {
    setIsOpen(true);
    setModalData({ tipo: 'saída', date: new Date(), data: row });
  }

  function closeModal() {
    setIsOpen(false);
    setModalData(null);
  }

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
          <p className="text-lg">Unidades</p>
        </div>
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <div className="flex gap-2">
          {row.unidades.map((unidade) => {
            return (
              <div key={unidade.id}>
                <div className="rounded bg-gray-400 p-2 text-white">
                  {unidade.nome}
                </div>
              </div>
            );
          })}
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
          <span className="flex cursor-pointer flex-col">
            <span
              title={'Entrada'}
              onClick={() => {
                openModalEntrada(row);
              }}>
              <ArrowDownTrayIcon />
            </span>
          </span>
        );
      },
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
          <span className="flex cursor-pointer flex-col">
            <span
              title={'Saída'}
              onClick={() => {
                openModalSaida(row);
              }}>
              <ArrowUpTrayIcon />
            </span>
          </span>
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
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">
            Visitas do dia {moment(date).format('DD/MM/YYYY')}
          </h1>
          <Link to="/novo-acesso">
            <button className="btn-outline">Nova visita</button>
          </Link>
        </div>
        <DataTableBase
          columns={columns}
          data={visitis}
          noTableHead={false}
          noDataComponent={
            <div>
              <br />
              <p>Nenhuma visita encontrada</p>
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
            {modalData && (
              <h2 className="text-lg font-medium">
                Registrar {modalData.tipo}
              </h2>
            )}

            <button onClick={closeModal}>
              <CloseIcon />
            </button>
          </div>
          {modalData && (
            <div className="mb-3 text-base ">
              Deseja registrar a {modalData.tipo} de{' '}
              <b>{modalData.data.visitante.nome}</b> dia{' '}
              {moment(modalData.date).format('DD/MM/YYYY') +
                ' às ' +
                moment(modalData.date).format('HH:mm')}{' '}
              ?
            </div>
          )}

          <div className="flex flex-row-reverse">
            <button className="btn-outline">Registrar</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
