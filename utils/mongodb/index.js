// mongodb.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Update with your MongoDB URI
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getMongoDBStatus() {
  return client.isConnected();
}

module.exports = { connectToMongoDB, getMongoDBStatus };
