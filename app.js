import express from "express";

import todoRouter from "./routes/todo.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/todo", todoRouter);

app.listen(PORT, () => {
  console.log("Server started");
});
