const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const todoRouter = require("./routes/todo");

app.use(express.json());

app.use("/api/todo", todoRouter);

app.listen(PORT, () => {
  console.log("Server started");
});
