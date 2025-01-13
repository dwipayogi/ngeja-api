import { Request, Response } from "express";
import prisma from "../../client";

export const createQuestion = async (req: Request, res: Response) => {
  const { number, question, answer, level, explanation } = req.body;
  const newQuestion = await prisma.question.create({
    data: {
      number,
      question,
      answer,
      level: {
        connect: {
          name: level,
        },
      },
      explanation,
    },
  });
  res.json(newQuestion);
};

export const getQuestion = async (req: Request, res: Response) => {
  const { number, level } = req.params;
  const question = await prisma.question
    .findFirst({
      where: {
        number: parseInt(number),
        level: {
          name: level,
        },
      },
      select: {
        number: true,
        question: true,
        answer: true,
        level: true,
        explanation: true,
      },
    })
    .then((question) => {
      res.json(question);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while retrieving ${number}`,
      });
    });
};
