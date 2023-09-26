const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config();

const uri = process.env.MONGODB_URI // Make sure the database name is correct

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    console.log('MongoDB connected successfully'); // Add this line for debugging

    return client.db("katalog_obat");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = { connectToMongoDB, client }
