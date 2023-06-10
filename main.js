const express = require("express");

const app = express();

const usersRouter = require("./src/routes/usersRoutes");

const errorHandler = require("express-async-error").Handler;

//Routes
const postRoutes = require('./src/routes/postRoutes');

// imports
require("./db");

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// error handler over any async function
app.use(errorHandler());

// routing
app.use("/users", usersRouter);

app.use((req, res, next) => {
  res.send("<h1 style='text-align:center'>Hello World</h1>");
});

//Routes Handeling
app.use('/posts',postRoutes)

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || [],
  });
});

app.listen(8000);
