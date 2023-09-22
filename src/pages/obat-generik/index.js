// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableObatGenerik from './TableObatGenerik'

const ObatGenerik = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='' target='_blank'>
            Tabel Obat Generik
          </Link>
        </Typography>
        <Typography variant='body2'>Nama obat, kegunaan, komposisi</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Obat Generik' titleTypographyProps={{ variant: 'h6' }} />
          <TableObatGenerik />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ObatGenerik
