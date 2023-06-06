const express = require("express");

const app = express();

// imports
require("./db");

app.use((req, res, next) => {
  res.send("<h1 style='text-align:center'>Hello World</h1>");
});

app.listen(8000);
