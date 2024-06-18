import { NextApiRequest, NextApiResponse } from 'next'

type customType = (req: NextApiRequest, res: NextApiResponse)=> Promise<void>

const allowCors = (fn: customType) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

export default allowCors