import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse ) {
  res.status(200).send('Hello from Vercel!')
}

