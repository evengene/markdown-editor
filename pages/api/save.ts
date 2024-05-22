import { NextApiRequest, NextApiResponse } from "next";
import getDb from "../../src/server/atlasClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const db = await getDb();
  const { body } = req;
  try {
    await db.collection('sample').insertOne(body);
    console.log(`db inserted: ${body}`);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
}
