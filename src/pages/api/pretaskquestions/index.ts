import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  switch (method) {
    case "POST":
      const preTaskQuestion = await prisma.preTaskQuestion.create({
        data: body,
      });
      res.status(201).json(preTaskQuestion);
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};
