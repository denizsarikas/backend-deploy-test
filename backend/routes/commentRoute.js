const express = require('express');
const router = express.Router({ mergeParams: true });
//const router = express.Router();

const { getComments, createComment } = require('../controllers/commentController');

// POST a new comment
router.post('/', createComment);

// GET all comments of a post
router.get('/', getComments);

module.exports = router;