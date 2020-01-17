const router = require('express').Router()
const PostController = require('../controllers/postC')
const { authentication, authorization } = require('../middlewares/auth')
const gcs = require('../middlewares/gcs')

router.get('/', PostController.getAllPost)

router.get('/:id', PostController.getOnePost)

router.post('/', authentication, gcs.single('file'), PostController.createPost)

router.delete('/:id', authentication, authorization, PostController.deletePost)

router.patch('/likes/:id', authentication, PostController.likePost)

router.patch('/dislikes/:id', authentication, PostController.dislikePost)

module.exports = router