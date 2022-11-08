import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import DataTableBase from '../../components/data-table';
import ProfileIcon from '../../components/icons/profileIcon';
import WrenchScrewdriverIcon from '../../components/icons/WrenchScrewdriverIcon';
import ArrowDownTrayIcon from '../../components/icons/arrowDownTray';
import ArrowUpTrayIcon from '../../components/icons/arrowUpTrayIcon';
import Modal from 'react-modal';
import CloseIcon from '../../components/icons/closeIcon';
import CalendarIcon from '../../components/icons/calendarIcon';
import CalendarBase from '../../components/calendar';
import InputField from '../../components/fields/inputField';
import VisitsRepository from '../../repository/VisitsRepository';
import Toaster from '../../utils/ui/toaster';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import SosAlert from '../../components/sos-alert';

export default function VisitsHome() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [visitis, setVisits] = useState([]);
  const [visitsFiltered, setVisitsFiltered] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [txtFiltro, setTxtFiltro] = useState('');
  const [unidadesSos, setUnidadesSos] = useState([]);

  useEffect(() => {
    console.log(date);
    VisitsRepository.findAllByDate(date).then((response) => {
      setVisits(response);
      setVisitsFiltered(response);
      setTxtFiltro('');
    });

    onSnapshot(collection(db, 'sos'), (dataSnapshot) => {
      const unidades = [];
      dataSnapshot.docs.map((doc) => {
        unidades.push(doc.data());
      });
      setUnidadesSos(unidades);
    });
  }, [date]);

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

  function onChangeCalendar(date) {
    setDate(date);
    setTxtFiltro('');
    setCalendarIsOpen(false);
  }

  function handleFiltroChange(event) {
    const value = event.target.value.toLowerCase();
    setTxtFiltro(value);
    let teste = visitis.filter((item) => {
      let nome = item.nomeCompleto.toLowerCase();
      if (nome.includes(value)) return true;

      let documento = item.documento.replace(/[^\d]+/g, '');
      let termoDocumento = value.replace(/[^\d]+/g, '');

      if (termoDocumento.length > 0) {
        if (documento.includes(termoDocumento)) return true;
      }
      return false;
    });
    setVisitsFiltered(teste);
  }

  function salvarLogVisita() {
    VisitsRepository.sendVisitLog({
      idVisita: modalData.data.id,
      data: modalData.date,
      tipo: modalData.tipo === 'entrada' ? 0 : 1,
    })
      .then((response) => {
        Toaster.showSuccess('Registro salvo');
      })
      .finally(() => {
        closeModal();
      });
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
                  {unidade.titulo}
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

  const showCalendar = () => {
    setCalendarIsOpen(!calendarIsOpen);
  };

  return (
    <div>
      {unidadesSos && <SosAlert unidades={unidadesSos} />}
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <div className="flex">
            <h1 className="text-2xl">
              Visitas do dia {moment(date).format('DD/MM/YYYY')}
            </h1>
            <div
              className="mt-1.5 ml-1.5 cursor-pointer"
              onClick={() => {
                showCalendar();
              }}>
              <CalendarIcon color={'text-black'} />
            </div>
          </div>

          <div>
            <Link to="/cpf-bloqueado">
              <button className="btn-outline mr-2">CPF Bloqueado</button>
            </Link>
            <Link to="/nova-visita">
              <button className="btn-outline">Nova visita</button>
            </Link>
          </div>
        </div>
        <div className={`absolute ${!calendarIsOpen ? 'hidden' : ''}`}>
          <CalendarBase
            onChange={onChangeCalendar}
            value={date}
            className="relative -top-6 right-0 z-50"
          />
        </div>

        <div className="mb-2 -mt-5">
          <InputField
            name="txtFiltro"
            value={txtFiltro}
            label="buscar por nome ou documento"
            type="text"
            onChange={handleFiltroChange}
          />
        </div>

        <DataTableBase
          columns={columns}
          data={visitsFiltered}
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
              <b>{modalData.data.nomeCompleto}</b> dia{' '}
              {moment(modalData.date).format('DD/MM/YYYY') +
                ' às ' +
                moment(modalData.date).format('HH:mm')}{' '}
              ?
            </div>
          )}

          <div className="flex flex-row-reverse">
            <button className="btn-outline" onClick={() => salvarLogVisita()}>
              Registrar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
