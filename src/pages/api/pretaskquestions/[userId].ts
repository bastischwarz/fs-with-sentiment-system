import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      const preTaskQuestion = await prisma.preTaskQuestion.findFirst({
        where: {
          userId: query.userId as string,
        },
      });
      res.status(200).json(preTaskQuestion);
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};
