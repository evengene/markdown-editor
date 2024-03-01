import express, { Express } from "express";
import fs from 'fs/promises';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';


import readRouter from './src/server/routes/read';
import updateRouter from './src/server/routes/update';
import deleteRouter from './src/server/routes/delete';
import saveRouter from './src/server/routes/save';

import './src/server/loadEnvironment';

const app: Express = express();
const port = process.env.PORT || 3002;
const uri = `mongodb+srv://elinafrontenddev:${process.env.MONGO_DB_PASSWORD}@mydb.azyhahy.mongodb.net/?retryWrites=true&w=majority&appName=MyDb`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// enable cors
app.use(( req, res, next ) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.static('public'));


app.use('/read', readRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/save', saveRouter)


async function run() {
  try {
    await client.connect();
    await client.db("markdown").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.post('/create', async ( req, res, next ) => {

  const { name, content } = req.body;

  try {
    console.log(`Received ${req.method} request for ${req.url}, body: ${JSON.stringify(req.body)}`);

    await client.connect();
    let database = client.db('markdown');
    let collection = database.collection('sample');

    const newDocument = {
      id: uuidv4(),
      createdAt: new Date().toLocaleDateString(),
      name,
      content,
    }

    await collection.insertOne(newDocument);
    console.log('New document created successfully' + newDocument);
    res.json(newDocument);
  } catch (err) {
    next(err);
  }
});

app.use(( req, res, next ) => {
  res.on('finish', () => {
    console.log(`on finish: Response sent with status code ${res.statusCode}`);
    console.log(`error message: ${res.statusMessage}`);
  });
  next();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});