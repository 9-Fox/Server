const router = require('express').Router()
const CommentController = require('../controllers/commentC')

router.get('/', CommentController.getAllComment)

router.post('/:postId', CommentController.createComment)

router.get('/:postId', CommentController.getPostComment)

module.exports = router