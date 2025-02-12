import { Router, Request, Response } from "express";
import { createUserSchema, loginSchema, users } from "../../db/schema";
import { validateData } from "../../middlewares/valiidationMiddleware";
import { db } from "../../db/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

const router = Router();

router.post(
  "/register",
  validateData(createUserSchema),
  async (req: Request, res: Response) => {
    try {
      const data = req.cleanBody;
      data.password = await bcrypt.hash(data.password, 10);
      const [user] = await db.insert(users).values(data).returning();
      user.password = "";
      const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      res.status(200).json({ message: "User registered!", token });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.post(
  "/login",
  validateData(loginSchema),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.cleanBody;
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (!user) {
        res.status(401).json({ error: "Authentication failed!" });
        return;
      }
      const matched = bcrypt.compare(password, user.password);
      if (!matched) {
        res.status(401).json({ error: "Authentication failed!" });
        return;
      }
      const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET!, {
        expiresIn: "12h",
      });
      res.status(200).json({ message: "Autherized!", token });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default router;
