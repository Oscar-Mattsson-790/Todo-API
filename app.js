import express, { response } from "express";

const app = express(); // Detta skapar en express applikation
const PORT = 8000;

app.use(express.json()); // This parses all incoming requests as JSON'

// Create an array to store todos
let todos = [];

// Endpoint to retrive all todos
app.get("/api/todo", (request, response) => {
  response.json(todos);
});

// Endpoint to add a new todo
app.post("/api/todo", (request, response) => {
  const newTodo = request.body;
  newTodo.id = todos.length + 1;
  newTodo.createdAt = new Date(); // Add createdAt field
  todos.push(newTodo);
  response.json(newTodo);
});

// Endpoint to delete a todo by ID
app.delete("/api/todo/:id", (request, response) => {
  const id = request.params.id;
  todos = todos.filter((todo) => todo.id !== Number(id));
  response.json({ message: `Todo with ID ${id} deleted` });
});

// Endpoint to retrieve all todos with pagination
app.get("/api/todo", (request, response) => {
  const page = parseInt(request.query.page) || 1; // Parse the "page" query parameter, default to 1
  const perPage = parseInt(request.query.perPage) || 10; // Parse the "perPage" query parameter, default to 10
  const start = (page - 1) * perPage; // Calculate the start index of the current page
  const end = start + perPage; // Calculate the end index of the current page
  const totalPages = Math.ceil(todos.length / perPage); // Calculate the total number of pages

  const paginatedTodos = todos.slice(start, end); // Get the todos for the current page

  response.json({
    todos: paginatedTodos,
    currentPage: page,
    totalPages: totalPages,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
