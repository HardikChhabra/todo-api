import { Router } from "express";
import {
  createTask,
  deleteTask,
  readAllTask,
  readTaskById,
  updateTask,
} from "./handler";
import { validateData } from "../../middlewares/valiidationMiddleware";
import { createTaskSchema, updateTaskSchema } from "../../db/schema";

const router = Router();

//C
router.post("/", validateData(createTaskSchema), createTask);

//R
router.get("/:id", readTaskById);
router.get("/user/:id", readAllTask); //remove id param after auth done

//U
router.put("/:id", validateData(updateTaskSchema), updateTask);

//D
router.delete("/:id", deleteTask);

export default router;
