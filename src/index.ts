import express from "express";
import taskRouter from "./routes/task/route.js";
import authRouter from "./routes/auth/route.js";
import { urlencoded, json } from "express";
import { verifyToken } from "./middlewares/authMiddleware.js";

const app = express();
/* const port = 3000; */

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/task", verifyToken, taskRouter);
app.use("/auth", authRouter);

/* app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
}); */
export default app;
