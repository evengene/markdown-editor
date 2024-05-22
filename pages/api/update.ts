import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

import getDb from "../../src/server/atlasClient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name, content } = req.body;

    let database = await getDb();

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
    res.status(400).json({
      success: false,
      message: err,
    });
  }
}
