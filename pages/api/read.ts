// pages/api/read.ts
import { NextApiRequest, NextApiResponse } from 'next'
import getDb from '../../src/server/atlasClient';
import { Db } from "mongodb";

let cachedDb: Db | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  cachedDb = await getDb();
  return cachedDb;
}

export default async function read(req: NextApiRequest, res: NextApiResponse ) {

  const db = await connectToDatabase();

  try {
    const data = await db
      .collection('sample')
      .find()
      .toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
