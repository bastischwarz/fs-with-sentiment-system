import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      const users = await prisma.user.findMany();
      res.status(200).json(users);
      break;

    case "POST":
      const user = await prisma.user.create({ data: body });
      res.status(201).json(user);
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};
