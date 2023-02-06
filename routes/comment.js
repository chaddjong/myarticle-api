const express = require("express");
const Comment = require("../models/commentModel");
const {
  createComment,
  getAllComments,
  getComment,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");

const router = express.Router();

// GET all comments
router.get("/", getAllComments);

// GET single comment
router.get("/:id", getComment);

// POST new comment
router.post("/", createComment);

// DELETE comment
router.delete("/:id", deleteComment);

// UPDATE comment
router.patch("/:id", updateComment);

module.exports = router;
