// ** React Imports
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Link from 'next/dist/client/link';

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

const columns = [
  { id: 'namaObat', label: 'Nama Obat', minWidth: 170 },
  { id: 'komposisi', label: 'Komposisi', minWidth: 100 },
  { id: 'formula', label: 'Formula', minWidth: 100 },
  {
    id: 'kegunaanUtama',
    label: 'Manfaat Utama',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'aksi',
    label: 'Lihat Detail',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2)
  }
]

function createData(namaObat, komposisi, formula, kegunaanUtama) {
  return { namaObat, komposisi, formula, kegunaanUtama };
}


const TableObatGenerik = () => {
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]); // Declare data state

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/obat-generik');
        if (response.ok) {
          const result = await response.json();
          setData(result); // Update data state
        } else {
          console.error('Error fetching obat generik data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const rows = data.map((row) => createData(row.namaObat, row.komposisi, row.formula, row.kegunaanUtama));

  return (

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'aksi') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Link href={`/detail-obat/${row._id}`}>
                            <Button variant='contained' color='primary'>
                              Detail
                            </Button>
                          </Link>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align='center'>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableObatGenerik
