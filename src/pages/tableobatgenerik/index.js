// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Link from 'next/dist/client/link'
import { useRouter } from 'next/router'

const columns = [
  {
    field: 'namaObat',
    headerName: 'Nama Obat',
    width: 170,
    minWidth: 170,
  },
  {
    field: 'komposisi',
    headerName: 'Komposisi',
    width: 100,
    minWidth: 100,
  },
  {
    field: 'formula',
    headerName: 'Formula',
    width: 100,
    minWidth: 100,
  },
  {
    field: 'kegunaanUtama',
    headerName: 'Manfaat Utama',
    width: 170,
    minWidth: 170,
  },
  {
    field: 'aksi',
    headerName: 'Lihat Detail',
    width: 170,
    minWidth: 170,
    renderCell: (params) => {
      const { _id } = params.row;

      return (
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleDetailClick(_id)}>
          Detail
        </Button>
      );
    },
  },
];

function createData(namaObat, komposisi, formula, kegunaanUtama) {
  return { namaObat, komposisi, formula, kegunaanUtama };
}

const TableObatGenerik = () => {
  // ** States
  const [data, setData] = useState([]); // Declare data state
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleDetailClick = (_id) => {
    router.push({
      pathname: '/detail-obat',
      query: { _id },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('http://localhost:3001/api/obat-generik');
        if (response.ok) {
          const result = await response.json();
          setData(result); // Update data state
        } else {
          console.error('Error fetching obat generik data.');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const rows = data.map((row) => createData(row.namaObat, row.komposisi, row.formula, row.kegunaanUtama));

  return (
    <div>
      {isLoading && <div>Loading...</div>}

      {!isLoading && (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 100]}
          checkboxSelection={false}
        />
      )}
    </div>
  );
};

export default TableObatGenerik;
