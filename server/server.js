const express = require('express');
const { connectToMongoDB } = require('./mongoDB'); // Import the correct MongoDB connection function
const cors = require('cors');

const app = express();

// Express JS
app.use(express.json());
app.use(cors());


// Cek Status koneksi MongoDB
app.get('/api/mongodb-status', async (req, res) => {
  try {
    // Cek koneksi ke MongoDB pake MongoDB Driver
    await connectToMongoDB(); // Call the correct function to check MongoDB status

    // Respon status pake JSON
    res.json({ isConnected: true });
  } catch (error) {
    console.error('Error checking MongoDB status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Kirim status server
app.get('/api/server-status', (req, res) => {
  res.json({ status: 'Online' });
});

// Kirim (POST) data obat_generik ke MongoDB
app.post('/api/add-obat-generik', async (req, res) => {

  const { namaObat, komposisi, kegunaanUtama, deskripsi, formula } = req.body;

  try {
    const db = await connectToMongoDB();
    const obatGenerikCollection = db.collection('obat_generik');

    // Insert the data into the "obat_generik" collection, including the 'formula' field
    await obatGenerikCollection.insertOne({ namaObat, komposisi, kegunaanUtama, deskripsi, formula });

    res.status(201).json({ message: 'Obat added successfully' });
  } catch (error) {
    console.error('Error adding obat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ambil data obat generik dari MongoDB
app.get('/api/obat-generik', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const obatGenerikCollection = db.collection('obat_generik');
    const data = await obatGenerikCollection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching obat generik data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ambil Detail Data Obat berdasarkan row yang dipilih user
// Ambil Detail Data Obat berdasarkan row yang dipilih user
app.get('/api/obat-generik/:namaObat', async (req, res) => {
  const { namaObat } = req.params;

  try {
    const db = await connectToMongoDB();
    const obatGenerikCollection = db.collection('obat_generik');

    // Find the obat by _id
    //const obat = await obatGenerikCollection.findOne({ _id });
    const obat = await obatGenerikCollection.findOne({ namaObat });

    if (!obat) {
      return res.status(404).json({ error: 'Obat not found' });
    }

    res.json(obat);
  } catch (error) {
    console.error('Error fetching obat generik data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Set Port buat server
const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  // Mulai Koneksi ke MongoDB saat server start
  await connectToMongoDB();
});

