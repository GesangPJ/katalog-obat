// server/server.js
const express = require('express');
const { MongoClient } = require('mongodb');

// Import MongoClient from mongodb
const app = express();
const port = process.env.PORT || 3001;

// MongoDB connection URI (replace with your MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/katalog_obat';

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Define a route to check the MongoDB connection status
app.get('/api/mongodb-status', async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const isConnected = client.isConnected();
    client.close();
    res.json({ isConnected });
  } catch (error) {
    res.status(500).json({ error: 'Unable to check MongoDB status' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
