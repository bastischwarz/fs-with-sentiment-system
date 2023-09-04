import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      const demographic = await prisma.demographic.create({ data: body });
      res.status(201).json(demographic);
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};
