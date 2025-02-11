import express from "express";
import taskRouter from "./routes/task/route";
import { urlencoded, json } from "express";
const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/task", taskRouter);

app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});
