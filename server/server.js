const express = require('express')
const { connectToMongoDB, disconnectFromMongoDB } = require('./mongoDB') // Import MongoDB connection functions

const app = express()

// Express JS

// Cek Status koneksi MongoDB
app.get('/api/mongodb-status', async (req, res) => {
  try {
    //Cek koneksi ke MongoDB pake MongoDB Driver
    const isConnected = await checkMongoDBStatus() // Implement this function

    // Respon status pake JSON
    res.json({ isConnected })
  } catch (error) {
    console.error('Error checking MongoDB status:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Set Port buat server
const port = process.env.PORT || 3001
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`)

  // Connect to MongoDB when the server starts
  await connectToMongoDB()
})
