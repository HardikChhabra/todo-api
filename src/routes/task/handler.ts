import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { tasks } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";

//C
export async function createTask(req: Request, res: Response) {
  try {
    const [newTask] = await db
      .insert(tasks)
      .values({ ...req.cleanBody, userId: req.userId })
      .returning();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
}

//R
export async function readTaskById(req: Request, res: Response) {
  try {
    const [task] = await db
      .select()
      .from(tasks)
      .where(
        and(
          eq(tasks.taskId, req.params.id!),
          eq(tasks.userId, String(req.userId))
        )
      );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
}
export async function readAllTask(req: Request, res: Response) {
  try {
    const allTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, String(req.userId)));
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
}

//U
export async function updateTask(req: Request, res: Response) {
  try {
    const updatedFields = req.cleanBody;
    const [updatedTask] = await db
      .update(tasks)
      .set(updatedFields)
      .where(
        and(
          eq(tasks.taskId, req.params.id!),
          eq(tasks.userId, String(req.userId))
        )
      )
      .returning();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
}

//D
export async function deleteTask(req: Request, res: Response) {
  try {
    const [deletedTask] = await db
      .delete(tasks)
      .where(
        and(
          eq(tasks.taskId, req.params.id!),
          eq(tasks.userId, String(req.userId))
        )
      )
      .returning();
    if (!deletedTask) {
      res.status(404).json({ error: "Task not found!" });
      return;
    }
    res.status(204);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
}
