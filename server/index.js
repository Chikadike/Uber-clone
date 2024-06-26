const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose');

const uri = "mongodb+srv://dikechika87:Okanumee1987.@cluster0.p3sheud.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('sample_mflix');
    const collection = db.collection('movies');

    // Find the first document in the collection
    const first = await collection.findOne();
    console.log(first);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}
run().catch(console.error);


module.exports = mongoose;
