// SearchBar.js
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Magnify from 'mdi-material-ui/Magnify';
import { Link } from 'next/link';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Make an API request for search results and update the state
    // You can use axios or the fetch API for this.
  }, [searchTerm]);

  return (
    <div>
      <TextField
        label="Cari"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Magnify fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <div>
        {searchResults.map((result) => (
          <div key={result.namaObat}>
            <Link href={`/detail-obat-generik?namaObat=${result.namaObat}`} passHref>
              {result.namaObat}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
