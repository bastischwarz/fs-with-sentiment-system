import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { shuffle } from "../../../../lib/shuffle";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { userId } = query;

  switch (method) {
    case "GET":
      let preStudyQuestions = await prisma.preStudyQuestion.findMany({
        where: {
          userId: userId as string,
          stance: {
            gte: -1,
            lte: 1,
          },
        },
      });

      // If for whatever reason the user gets to the pre-task questionnaire even though
      // they had strong opinions about the topics, redirect them to the thank you page.
      if (preStudyQuestions.length === 0) {
        res.redirect("/thank-you");
      }

      // Shuffle the questions if more than one question
      // is returned to randomly select one topic with mild stance
      if (preStudyQuestions.length > 1) {
        preStudyQuestions = shuffle(preStudyQuestions);
      }

      res.status(200).json(preStudyQuestions[0]);
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};
