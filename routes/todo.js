const { Router } = require("express");
const router = Router();

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

const { checkBody, checkParams } = require("../middleware/index");
const { get, add, remove } = require("../controllers/todoController");

router.get("/", get);

router.post("/", checkBody, add);

router.delete("/:id", checkParams, remove);

module.exports = router;
