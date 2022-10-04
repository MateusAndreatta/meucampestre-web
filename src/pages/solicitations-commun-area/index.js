import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import CondoSolicitations from './CondoSolicitations';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import BookCommunAreaRepository from '../../repository/BookCommunAreaRepository';
import moment from 'moment/moment';
import Tooltip from '../../components/tooltip';
import StatusTag from '../../components/status-tag';
import DataTableBase from '../../components/data-table';
import TrashIcon from '../../components/icons/trashIcon';
import UnityRepository from '../../repository/UnityRepository';
import Toaster from '../../utils/ui/toaster';

export default function SolicitationsCommunArea() {
  const roles = SessionData.getRoles();
  const [data, setData] = useState([]);
  const [condoSolicitationsEnable, setCondoSolicitationsEnable] = useState(
    roles.includes(ROLES.SINDICO)
  );

  function requestData() {
    BookCommunAreaRepository.findAllByUser().then((response) => {
      setData(response);
    });
  }

  function handleClickDeletar(row) {
    console.log(row);
    BookCommunAreaRepository.remove(row.id).then((response) => {
      Toaster.showInfo('Solicitação removida');
      window.location.reload(false);
    });
  }

  useEffect(() => {
    requestData();
  }, []);

  const columns = [
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
          <button onClick={() => handleClickDeletar(row)}>
            <TrashIcon />
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Suas Solicitações</h1>
        </div>
        <DataTableBase
          columns={columns}
          data={data}
          noTableHead={false}
          responsive={true}
          noDataComponent={
            <div>
              <br />
              <p>Você não tem nenhuma solicitação aberta no momento</p>
              <br />
            </div>
          }
        />

        {condoSolicitationsEnable && <CondoSolicitations />}
      </div>
    </div>
  );
}
