import { Request, Response } from "express";
import prisma from "../../client";

export const createLevel = async (req: Request, res: Response) => {
  const { name, number, category } = req.body;
  const newLevel = await prisma.level.create({
    data: {
      name,
      number,
      category: {
        connectOrCreate: {
          where: {
            name: category,
          },
          create: {
            name: category,
          },
        },
      },
    },
  });
  res.json(newLevel);
};

export const getLevel = async (req: Request, res: Response) => {
  const name = req.params.name as string;
  const level = await prisma.level
    .findFirst({
      where: {
        name: name,
      },
      select: {
        name: true,
        number: true,
        category: true,
      },
    })
    .then((level) => {
      res.json(level);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while retrieving ${name}`,
      });
    });
};

export const updateLevel = async (req: Request, res: Response) => {
  const name = req.params.name as string;
  const { newName, number, category } = req.body;
  const level = await prisma.level.update({
    where: { name },
    data: {
      name: newName,
      number: number,
      category: {
        connectOrCreate: {
          where: {
            name: category,
          },
          create: {
            name: category,
          },
        },
      },
    },
  });
  res.json(level);
};

export const deleteLevel = async (req: Request, res: Response) => {
  const name = req.params.name as string;
  const level = await prisma.level.delete({
    where: { name },
  });
  res.json(level);
};
