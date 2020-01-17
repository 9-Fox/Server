const router = require('express').Router()
const CommentController = require('../controllers/commentC')

const {authentication,authorization} = require('../middlewares/auth')

router.get('/', CommentController.getAllComment)

router.post('/:postId', authentication , CommentController.createComment)


router.get('/:postId', CommentController.getPostComment)

module.exports = router