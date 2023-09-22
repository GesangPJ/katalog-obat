// ** /views/statuspage/index.js
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react';

const DemoGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`,
  },
}));

const StatusPage = () => {
  const [mongoDBStatus, setMongoDBStatus] = useState(null);

  useEffect(() => {
    // Make a GET request to the backend to check the MongoDB status
    fetch('http://localhost:3000/api/mongodb-status')
      .then((response) => response.json())
      .then((data) => {
        setMongoDBStatus(data.isConnected ? 'Connected' : 'Disconnected');
      })
      .catch((error) => {
        console.error(error);
        setMongoDBStatus('Error');
      });
  }, []);

  return (
    <Card>
      <CardHeader title='' titleTypographyProps={{ variant: 'h3' }} position="center" />
      <CardContent>
        <Grid container spacing={6} justifyContent="center" textAlign={'justify'} style={{ marginBottom: '10px' }}>
          <Typography variant='h4'>
            Web Status
          </Typography>
        </Grid>
        <br></br>
        <Grid container spacing={6} justifyContent="center" textAlign={'justify'}>
          <DemoGrid item xs={5} sm={9}>
            <Typography variant="body1">
              Mongo DB Connection : {mongoDBStatus}
            </Typography>
          </DemoGrid>
        </Grid>
      </CardContent>
    </Card>)
}

export default StatusPage;
