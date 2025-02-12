import { relations } from "drizzle-orm";
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
  userId: true,
});
export const updateTaskSchema = createInsertSchema(tasks)
  .omit({
    taskId: true,
    userId: true,
    createdAt: true,
  })
  .partial();

export const users = pgTable("users", {
  email: text("email").primaryKey(),
  name: text("name").notNull(),
  password: text("pwd").notNull(),
});
export const createUserSchema = createInsertSchema(users);
export const loginSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
});

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export const blogsRelations = relations(tasks, ({ one, many }) => ({
  user: one(users, { fields: [tasks.userId], references: [users.email] }),
}));
