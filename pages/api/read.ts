// pages/api/read.ts
import { NextApiRequest, NextApiResponse } from 'next'
import getDb from '../../src/server/atlasClient';
import { Db } from "mongodb";

let cachedDb: Db | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log('Using cached database instance');
    return cachedDb;
  }

  console.log('Establishing new database connection');
  cachedDb = await getDb();
  console.log('Database connection established');
  return cachedDb;
}

export default async function read(req: NextApiRequest, res: NextApiResponse ) {

  const db = await connectToDatabase();

  try {
    console.log('Executing database query');
    const data = await db
      .collection('sample')
      .find()
      .toArray();
    console.log('Database query executed', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error occurred', error);
    res.status(500).json({ message: 'Server error' });
  }
}
