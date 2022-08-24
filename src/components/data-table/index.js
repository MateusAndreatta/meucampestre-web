import React from 'react';
import DataTable from 'react-data-table-component';

function DataTableBase(props) {
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
    <DataTable
      noTableHead={true}
      responsive={false}
      customStyles={customStyles}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      noDataComponent={
        <div>
          <br />
          <p>Nenhum registro encontrado</p>
          <br />
        </div>
      }
      {...props}
    />
  );
}

export default DataTableBase;
