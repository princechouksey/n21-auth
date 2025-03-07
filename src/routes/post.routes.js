const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller')
const userMiddleware = require('../middlewares/user.middleware')
router.get('/create', userMiddleware.authUser ,postController.viewPostController )
router.post('/create', userMiddleware.authUser ,postController.createPostController )






module.exports = router