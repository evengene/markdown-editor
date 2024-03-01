import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString = `mongodb+srv://elinafrontenddev:${process.env.MONGO_DB_PASSWORD}@mydb.azyhahy.mongodb.net/?retryWrites=true&w=majority&appName=MyDb` || '';

const client = new MongoClient(connectionString, {
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

  const database = connection.db("markdown");

  return database;

}

export default getDb;

