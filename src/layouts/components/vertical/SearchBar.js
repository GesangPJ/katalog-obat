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
    // Function to send the search term to the API
    const sendSearchRequest = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/search/${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error('Error fetching search results');
        }
      } catch (error) {
        console.error('Error sending search request:', error);
      }
    };

    // Call the API when the search term changes
    sendSearchRequest();
  }, [searchTerm]);

  return (
    <div>
      <TextField
        label="Search"
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
