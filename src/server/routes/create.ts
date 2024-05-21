import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import getDb from '../atlasClient';

const router = express.Router();

router.post('/', async ( req, res, next ) => {

  const { name, content } = req.body;

  try {
    console.log(`Received ${req.method} request for ${req.url}, body: ${JSON.stringify(req.body)}`);

    let database = await getDb();

    const newDocument = {
      id: uuidv4(),
      createdAt: new Date().toLocaleDateString(),
      name,
      content,
    }

    await database.collection('sample').insertOne(newDocument);
    console.log(newDocument);
    res.json(newDocument);
  } catch (err) {
    next(err);
    console.error(err);
  }
});

export default router;
