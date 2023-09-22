// katalog-obat/server/server.js

const express = require('express');
const { connectToMongoDB } = require('./mongoDB'); // Import the MongoDB connection function

const app = express();

// Your Express.js routes and middleware go here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  // Connect to MongoDB
  await connectToMongoDB();
});
