const router = require('express').Router()
const UserRouter = require('./UserRouter')
const PostRouter = require('./PostRouter')
const CommentRouter = require('./CommentRouter')

router.use('/users', UserRouter)

router.use('/posts', PostRouter)

router.use('/comments', CommentRouter)

module.exports = router