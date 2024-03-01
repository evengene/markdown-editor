import express from 'express';
import fs from "fs/promises";
import path from "node:path";

const router = express.Router();

router.delete('/', async ( req, res, next ) => {
  try {
    const { id, name } = req.body;
    const dataFilePath = path.join(__dirname, '..', '..', 'data.json');
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const fileIndex = jsonData.findIndex(( document: any ) => document.name === name && document.id === id);

    if (fileIndex === -1) {
      res.status(404).send('File not found');
    } else {
      jsonData.splice(fileIndex, 1);
      await fs.writeFile('data.json', JSON.stringify(jsonData, null, 2));
      res.send(`File ${name} deleted`);
    }
  } catch (err) {
    next(err);
  }
});

export default router;