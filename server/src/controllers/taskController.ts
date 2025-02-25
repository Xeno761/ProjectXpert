import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    let tasks = [];
    if (projectId) {
      tasks = await prisma.task.findMany({
        where: {
          projectId: Number(projectId),
        },
        include: {
          author: true,
          assignee: true,
          comments: true,
          attachments: true,
        },
      });
    } else {
      tasks = await prisma.task.findMany({
        include: {
          author: true,
          assignee: true,
          comments: true,
          attachments: true,
        },
      });
    }
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tasks: ${error.message}` });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    currentUserId,
    assignedUser,
  } = req.body;

  // find current user and assigned user ID
  try {
    const authorUser = await prisma.user.findUnique({
      where: {
        cognitoId: currentUserId,
      },
    });

    const assignedUserRecord = await prisma.user.findUnique({
      where: {
        cognitoId: assignedUser,
      },
    });

    if (!authorUser) {
      console.log("Could not find the assigning user");
      return res
        .status(400)
        .json({ message: "Could not find the assigning user" });
    }

    if (!assignedUserRecord) {
      console.log("Could not find the assigned user");
      return res
        .status(400)
        .json({ message: "Could not find the assigned user" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId: authorUser?.userId as number,
        assignedUserId: assignedUserRecord?.userId as number,
      },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Error creating a task: ${error.message}` });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        author: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user's tasks: ${error.message}` });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { taskId } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(taskId) },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id: parseInt(taskId) },
    });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
