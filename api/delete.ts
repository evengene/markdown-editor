import { NextApiRequest, NextApiResponse } from "next";
import getDb from "../src/server/atlasClient";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
  try {
    const { id, name } = req.body;
    const database = await getDb();
    const collection = database.collection('sample');
    const deleteResult = collection.deleteOne({ name, id });
    console.log(deleteResult);

    if (await deleteResult.then(( result ) => result.deletedCount === 0)) {
      res.status(404).send('File not found');
      return;
    }
    res.status(200).send('File deleted successfully');
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
}



