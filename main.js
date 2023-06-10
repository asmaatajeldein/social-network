const express = require("express");

const app = express();
const errorHandler = require("express-async-error").Handler;

// imports
require("./db");
const commentRoutes = require("./src/routes/commentRoutes");
const commentValidation = require("./src/utils/commentValidation");

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// error handler over any async function
app.use(errorHandler());

// Routes
app.use("/comments", commentValidation, commentRoutes);

app.use((req, res, next) => {
  res.send("<h1 style='text-align:center'>Hello World</h1>");
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || []
  });
});

app.listen(8000);
