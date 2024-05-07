import express from 'express';

import getDb from '../atlasClient';

const router = express.Router();

router.delete('/', async (req, res, next) => {
  try {
    const { id, name } = req.body;
    const database = await getDb();
    const collection = database.collection('sample');
    const deleteResult = collection.deleteOne({ name, id });
    console.log(deleteResult);

    if (await deleteResult.then((result) => result.deletedCount === 0)) {
      res.status(404).send('File not found');
      return;
    }
    res.status(200).send('File deleted successfully');
  } catch (err) {
    next(err);
  }
});


export default router;