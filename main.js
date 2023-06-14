const express = require("express");

const app = express();

// Environment variables
require("dotenv").config();

const errorHandler = require("express-async-error").Handler;

// imports
require("./db");

//Routes
const postRoutes = require("./src/routes/postRoutes");
const usersRouter = require("./src/routes/usersRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// error handler over any async function
app.use(errorHandler());

// Routes
app.use("/users", usersRouter);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/reviews", reviewRoutes);

app.use((req, res, next) => {
  res.send("<h1 style='text-align:center'>Hello World</h1>");
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || [],
  });
});

app.listen(process.env.PORT);
