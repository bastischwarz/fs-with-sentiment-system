import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      await prisma.preStudyQuestion.createMany({
        data: body,
      });
      res
        .status(201)
        .send({ message: "Successfully created pre-study question" });
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};
