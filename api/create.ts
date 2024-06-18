import { NextApiRequest, NextApiResponse } from "next";
import getDb from "../src/server/atlasClient";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { name, content } = req.body;

  try {
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
    res.status(400).json({
      success: false,
      message: err,
    });
  }
}

