import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'styled-components';

// Statyczne dane
const data = [
  { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', phone: '555-5555', website: 'johndoe.com' },
  { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com', phone: '555-5556', website: 'janesmith.com' },
  { id: 3, name: 'Alice Johnson', username: 'alicej', email: 'alice@example.com', phone: '555-5557', website: 'alicejohnson.com' },
  { id: 4, name: 'Bob Brown', username: 'bobb', email: 'bob@example.com', phone: '555-5558', website: 'bobbrown.com' },
];

// Kolumny tabeli
const columns = [
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Username',
    selector: row => row.username,
    sortable: true,
    omit: true, // Domyślnie ukryjemy kolumny, a w useEffect zaktualizujemy ich widoczność
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
    omit: true,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
    sortable: true,
    omit: true,
  },
  {
    name: 'Website',
    selector: row => row.website,
    sortable: true,
    omit: true,
  },
];

// Komponent rozszerzający rząd
const ExpandedComponent = ({ data }) => (
  <div>
    <p><strong>Username:</strong> {data.username}</p>
    <p><strong>Email:</strong> {data.email}</p>
    <p><strong>Phone:</strong> {data.phone}</p>
    <p><strong>Website:</strong> {data.website}</p>
  </div>
);

const customStyles = {
  table: {
    style: {
      width: '100%',
    },
  },
  tableWrapper: {
    style: {
      display: 'block',
      width: '100%',
      overflowX: 'auto',
    },
  },
};

const Tabelka = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [dynamicColumns, setDynamicColumns] = useState(columns);

  const handleResize = () => {
    const isMobileView = window.innerWidth < 768;
    setIsMobile(isMobileView);
    setDynamicColumns(columns.map(column => ({
      ...column,
      omit: isMobileView && column.name !== 'Name',
    })));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Wywołaj funkcję, aby ustawić początkowy stan
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <DataTable
        title="User List"
        columns={dynamicColumns}
        data={data}
        customStyles={customStyles}
        responsive={true}
        expandableRows={isMobile}
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
};

export default Tabelka;
