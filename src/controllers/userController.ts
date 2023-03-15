import { NextApiRequest, NextApiResponse } from 'next';
import Knex from 'knex';
import bcrypt from 'bcryptjs';

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
  }
  
  interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
  }
  
  interface CreateUserResponse {
    message: string;
  }
  
  export async function createUser({
    req,
    res,
  }: {
    req: NextApiRequest;
    res: NextApiResponse<CreateUserResponse>;
  }): Promise<void> {
    const { username, email, password } = req.body as CreateUserRequest;
  
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user: User = await Knex('users')
      .insert({
        username,
        email,
        password: hashedPassword,
      })
      .returning('*')
      .then((rows) => rows[0]);
  
    res.status(201).json({ message: 'User created successfully' });
  }