import { NextApiRequest, NextApiResponse } from 'next'
import getDb from '../../src/server/atlasClient';

export default async function read(req: NextApiRequest, res: NextApiResponse ) {

  try {
    let database = await getDb();
    const data = await database
      .collection('sample')
      .find()
      .toArray();
    res.json(data);
    console.log('Database query executed', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error occurred', error);
    res.status(500).json({ message: 'Server error' });
  }
}
