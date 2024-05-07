import express from 'express';

import getDb from '../atlasClient';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    let database = await getDb();
    const data = await database
      .collection('sample')
      .find()
      .toArray();
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while processing your request.', error });
  }
});

export default router;