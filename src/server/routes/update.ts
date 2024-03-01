import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { MongoClient, ServerApiVersion } from 'mongodb';

const router = express.Router();

const uri = `mongodb+srv://elinafrontenddev:${process.env.MONGO_DB_PASSWORD}@mydb.azyhahy.mongodb.net/?retryWrites=true&w=majority&appName=MyDb`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

router.post(`/`, async (req, res, next) => {
  try {
    console.log(`Received ${req.method} request for ${req.url} with body: ${req.body}`);
    const { id, name, content } = req.body;

    await client.connect();
    let database = client.db('markdown');
    let collection = database.collection('sample');
    let documents = await collection.find().toArray();

    const fileIndex = documents.findIndex((file) => file.id === id);

    if (fileIndex === -1) {
      // save as new file
      await collection.insertOne({
        id: uuidv4(),
        createdAt: new Date().toLocaleDateString(),
        name,
        content,
      });
      res.send(`File: "${name}" saved`);

    } else {
      // update existing file
      await collection.updateOne({ id }, { $set: { name, content } });
      res.json({ message: `File "${name}" updated` })
    }
  } catch (err) {
    next(err);
  }
});

export default router;