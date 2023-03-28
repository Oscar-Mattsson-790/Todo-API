import { Router } from "express";
import uuid from "uuid-random";
import { checkBody, checkParams } from "../middleware/index.js";
import database from "nedb-promises";

const router = Router();
const db = new database({ filename: "todos.db", autoload: true });

db.insert({
  todo: "Clean the house",
  id: "cdd160bf-b2f3-43d7-bced-94d0071ab7ec",
  done: true,
});
db.insert({
  todo: "Walk the dog",
  id: "123e4567-e89b-12d3-a456-426655440000",
  done: false,
});
db.insert({
  todo: "Buy groceries",
  id: "9d0fb0aa-7ca1-49d1-81ad-ccaf4dc4de4f",
  done: false,
});

/**
 * Hämta alla todos
 * URL: /api/todo
 * Method: GET
 *
 * Lägga till en todo
 * URL: /api/todo
 * Method: POST
 * body: {
 *  username: Ada
 *  password: pwd123
 * }
 *
 * Ta bort en todo
 * URL: /api/todo/:id
 * Method: DELETE
 */

router.get("/", (request, response) => {
  db.find({}, (err, todos) => {
    if (err) {
      console.error(err);
      response.status(500).json({ success: false, error: err });
    } else {
      response.json({ success: true, todos: todos });
    }
  });
});

router.post("/", checkBody, (request, response) => {
  const { todo } = request.body;

  const todoObj = {
    todo: todo,
    id: uuid(),
    done: false,
  };

  db.insert(todoObj, (err, newTodo) => {
    if (err) {
      console.error(err);
      response.status(500).json({ success: false, error: err });
    } else {
      const result = {
        success: true,
        todos: [newTodo],
      };
      response.json(result);
    }
  });
});

router.delete("/:id", checkParams, (request, response) => {
  const id = request.params.id;
  db.remove({ id: id }, {}, (err, numRemoved) => {
    if (err) {
      console.error(err);
      response.status(500).json({ success: false, error: err });
    } else {
      const result = {
        success: true,
        todos: [],
      };
      response.json(result);
    }
  });
});

export default router;
