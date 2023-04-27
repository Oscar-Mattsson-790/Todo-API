const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const todoRouter = require("./routes/todo");

app.use(express.json());

const apiKeys = [
  "7as32423Sss9sdD",
  "7asSAshCSsppPli",
  "67sSAshCSss9sdD",
  "1231SAsLLOOss9s",
  "7aVnBl23Sss9sdD",
];

function auth(request, response, next) {
  const apiKey = request.headers["api-key"];

  if (apiKey && apiKeys.includes(apiKey)) {
    next();
  } else {
    const resObj = {
      error: "Access denied! I find your lack of API-key disturbing!",
    };
    response.json(resObj);
  }
}

app.use("/api/todo", todoRouter);

app.get("/api/key", (request, response) => {
  const index = Math.floor(Math.random() * apiKeys.length);
  const apiKey = apiKeys[index];

  const resObj = {
    key: apiKey,
  };

  response.json(resObj);
});

app.listen(PORT, () => {
  console.log("Server started");
});
