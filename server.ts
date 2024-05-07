import express, { Express } from "express";

import readRouter from './src/server/routes/read';
import updateRouter from './src/server/routes/update';
import deleteRouter from './src/server/routes/delete';
import saveRouter from './src/server/routes/save';
import createRouter from './src/server/routes/create';

const app: Express = express();
const port = 3001 || 3002;


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
app.use('/create', createRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/save', saveRouter)


// async function run() {
//   try {
//     let database = await getDb();
//     const collection = database.collection('sample');
//     const data = await collection.find().toArray();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }
// run().catch(console.dir);

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