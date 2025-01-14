import { Request, Response } from "express";
import prisma from "../../client";

export const createProgress = async (req: Request, res: Response) => {
  const { user } = req.body;
  const newProgress = await prisma.progress.create({
    data: {
      user: {
        connect: {
          username: user,
        },
      },
    },
  });
  res.json(newProgress);
};

export const getProgress = async (req: Request, res: Response) => {
  const user = req.params.name as string;
  const progress = await prisma.progress
    .findFirst({
      where: {
        user: {
          username: user,
        },
      },
      select: {
        user: true,
        isCompleted: true,
        updatedAt: true,
      },
    })
    .then((progress) => {
      res.json(progress);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while retrieving ${user}`,
      });
    });
};