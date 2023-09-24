const express = require('express');
const { connectToMongoDB, disconnectFromMongoDB } = require('./mongoDB'); // Import MongoDB connection functions

const app = express();

// Your Express.js routes and middleware go here

// Middleware to check MongoDB status
app.get('/api/mongodb-status', async (req, res) => {
  try {
    // Check the MongoDB connection status using your MongoDB driver's method
    const isConnected = await checkMongoDBStatus(); // Implement this function

    // Respond with the status as JSON
    res.json({ isConnected });
  } catch (error) {
    console.error('Error checking MongoDB status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  // Connect to MongoDB when the server starts
  await connectToMongoDB();
});
