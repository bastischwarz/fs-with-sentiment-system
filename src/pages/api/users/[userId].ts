import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  switch (method) {
    case "POST":
      // Update the current user with the new stance
      const updatedUser = await prisma.user.update({
        where: {
          id: query.userId as string,
        },
        data: body,
      });
      res.status(200).json(updatedUser);
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};
