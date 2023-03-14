import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../../../controllers/userController';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, email, password } = req.body;
    await createUser({ req, res });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}