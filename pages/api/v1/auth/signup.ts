import { NextApiRequest, NextApiResponse } from 'next';
import createUser from '../../../../controllers/userController';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, email, password } = req.body;
    const user = await createUser({ username, email, password });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}