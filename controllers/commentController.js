const Comment = require("../models/commentModel");
const mongoose = require('mongoose')

// get all comments
const getAllComments = async (req, res) => {
    const comment = await Comment.find({}).sort({createdAt: -1})

    res.status(200).json(comment)
}

// get comment
const getComment = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such comment"})
    }

    const comment = await Comment.findById(id)

    if(!comment) {
        return res.status(404).json({error: 'Invalid comment id'})
    }

    res.status(200).json(comment)
}

// create new comment
const createComment = async (req, res) => {
  const { name, comment } = req.body;

  // add doc to db
  try {
    const comments = await Comment.create({ name, comment });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }  
}

// delete comment
const deleteComment = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid comment id'})
    }

    const comment = await Comment.findOneAndDelete({ _id: id})

    if(!comment) {
        return res.status(404).json({error: 'No such comment'})
    }

    res.status(200).json(comment)
}

// update comment
const updateComment = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid comment id'})
    }

    const comment = await Comment.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!comment) {
        return res.status(404).json({error: 'No such comment'})
    }

    res.status(200).json(comment)
}


module.exports = {
    createComment,
    getAllComments,
    getComment,
    deleteComment,
    updateComment
}