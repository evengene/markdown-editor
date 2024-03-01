import express from "express";
import path from "node:path";
import fs from "fs/promises";
import { writeData } from "./dataService";

const router = express.Router();

router.post(`/`, async ( req, res, next ) => {
  try {
    console.log(`Received ${req.method} request for ${req.url} with body: ${req.body} SAVEEEE`);
    const dataFilePath = path.join(__dirname, '..', '..', 'data.json');
    console.log(dataFilePath);
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    const { id, name, content } = req.body;
    console.log(id, name, content)
    jsonData.push({
      id,
      name,
      content: content || "",
    });
    await writeData(dataFilePath, jsonData);
    res.json({ message: 'Data saved' });
    console.log(res.statusCode)
    } catch (err) {
      next(err);
      console.log(`Error to save item: ${err}`);
    }
}).use(( req, res, next ) => {
  res.on('finish', () => {
    console.log(`on finish: Response sent with status code ${res.statusCode}`);
  });
  next();
});

export default router;