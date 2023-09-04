import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  switch (method) {
    case "POST":
      // From the user table, group by stance and count the number of users for each group
      const stanceWithLastEntries = await prisma.user.groupBy({
        by: ["stance"],
        _count: {
          stance: true,
        },
        orderBy: {
          _count: {
            stance: "asc",
          },
        },
        where: {
          stance: {
            not: null,
          },
        },
      });

      const stance =
        stanceWithLastEntries.length > 0
          ? stanceWithLastEntries[0].stance
          : "pos";

      // Update the current user with the new stance
      const updatedUser = await prisma.user.update({
        where: {
          id: query.userId as string,
        },
        data: {
          stance,
        },
      });
      res.status(200).json(updatedUser);
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};
