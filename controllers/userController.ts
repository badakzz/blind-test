import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import knex from "../models/knex";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const hashedPassword = await hash(password, 10);

    try {
      const insertResult = await knex("users").insert({
        user_name: username,
        email,
        password: hashedPassword,
        permissions: 1,
      });

      const userId = insertResult[0];

      return res.status(201).json({ success: true, userId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}