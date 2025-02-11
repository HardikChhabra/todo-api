import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const tasks = pgTable("tasks", {
  taskId: uuid("task_id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  task: text("task").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  description: text("description"),
  isComplete: boolean("is_complete").notNull().default(false),
  color: varchar("color", { length: 7 }).notNull().default("#FFFFFF"),
});
export const createTaskSchema = createInsertSchema(tasks).omit({
  taskId: true,
  createdAt: true,
});
export const updateTaskSchema = createInsertSchema(tasks)
  .omit({
    taskId: true,
    userId: true,
    createdAt: true,
  })
  .partial();
