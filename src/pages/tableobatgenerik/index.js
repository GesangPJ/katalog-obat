import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const columns = [
  { id: 'namaObat', label: 'Nama Obat', minWidth: 170, sortable: true },
  { id: 'komposisi', label: 'Komposisi', minWidth: 100 },
  { id: 'formula', label: 'Formula', minWidth: 100 },
  {
    id: 'kegunaanUtama',
    label: 'Manfaat Utama',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'aksi',
    label: 'Lihat Detail',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(namaObat, komposisi, formula, kegunaanUtama) {
  return { namaObat, komposisi, formula, kegunaanUtama };
}

const TableObatGenerik = () => {
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]); // Declare data state
  const [sorting, setSorting] = useState({ column: 'namaObat', direction: 'asc' });
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnId) => {
    const isAsc = sorting.column === columnId && sorting.direction === 'asc';
    setSorting({ column: columnId, direction: isAsc ? 'desc' : 'asc' });
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

  // Sorting function
  const sortedData = stableSort(rows, getComparator(sorting.direction, sorting.column));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                >
                  <div
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => column.sortable && handleSort(column.id)}
                  >
                    {column.label}
                    {column.sortable && (
                      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4px' }}>
                        {sorting.column === column.id && sorting.direction === 'asc' ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : sorting.column === column.id && sorting.direction === 'desc' ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <div style={{ height: '24px' }} />
                        )
                        }
                      </div>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.namaObat}>
                {columns.map((column) => {
                  const value = row[column.id];
                  if (column.id === 'aksi') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        {handleDetailClick(row.namaObat)}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableObatGenerik;
