import express from 'express';
import getDb from '../atlasClient';

const router = express.Router();

/** TODO: refactor to MongoDb */
router.post(`/`, async (req, res, next) => {
  try {
    console.log(`Received ${req.method} request for ${req.url} with body: ${req.body} SAVEEEE`);
    const { id, name, content } = req.body;

    let database = await getDb();
    let collection = database.collection('sample');
    await collection.updateOne({ id }, { $set: { name, content } });

    res.send(`File: "${name}" saved`);
    console.log(res.statusCode)
  } catch (err) {
    next(err);
    console.log(`Error to save item: ${err}`);
  }
}).use((req, res, next) => {
  res.on('finish', () => {
    console.log(`on finish: Response sent with status code ${res.statusCode}`);
  });
  next();
});

export default router;