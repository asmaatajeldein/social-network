const express = require("express");
const router = express.Router();

// getting all users
router.get("/", () => {});

// getting user by id
router.get("/:id", () => {});

// create a new user (register)
router.post("/", () => {});

// update user
router.patch("/:id", () => {});

// delete user
router.delete("/:id", () => {});

// login
router.post("/login", () => {});

module.exports = router;
