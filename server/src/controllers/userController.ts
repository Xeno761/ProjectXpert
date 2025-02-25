import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cognitoId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });

    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user: ${error.message}` });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: Number(id),
      },
    });

    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user: ${error.message}` });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const { username, cognitoId, email, firstName, lastName, role } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        email,
        firstName,
        lastName,
        role,
      },
    });
    res.json({ message: "User Created Successfully", newUser });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};
