import { Request, Response } from "express";
import prisma from "../../client";

export const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      email,
    },
  });
  res.json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const username = req.params.name as string;
  const user = await prisma.user
    .findFirst({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        exp: true,
      },
    })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while retrieving ${username}`,
      });
    });
};

export const updateUser = async (req: Request, res: Response) => {
  const username = req.params.name as string;
  const { newUsername, email, image } = req.body;
  const user = await prisma.user.update({
    where: { username },
    data: {
      username: newUsername,
      email: email,
      image: image,
    },
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const username = req.params.name as string;
  const user = await prisma.user.delete({
    where: { username },
  });
  res.json(user);
};
