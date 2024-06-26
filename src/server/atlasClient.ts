import { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO_DB_CONNECTION_STRING } from '../constants/shared';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGO_DB_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// TODO: Refactor other routes to use this function
const getDb = async () => {

  let connection;

  try {
    connection = await client.connect();
  } catch (error) {
    console.error(error);
    throw error;
  }

  const database = connection.db('markdown');

  return database;

}

export default getDb;

