import { Router } from "express";
import {
  createTask,
  deleteTask,
  readAllTask,
  readTaskById,
  updateTask,
} from "./handler.js";
import { validateData } from "../../middlewares/valiidationMiddleware.js";
import { createTaskSchema, updateTaskSchema } from "../../db/schema.js";

const router = Router();

//C
router.post("/", validateData(createTaskSchema), createTask);

//R
router.get("/:id", readTaskById);
router.get("/", readAllTask); //remove id param after auth done

//U
router.put("/:id", validateData(updateTaskSchema), updateTask);

//D
router.delete("/:id", deleteTask);

export default router;
