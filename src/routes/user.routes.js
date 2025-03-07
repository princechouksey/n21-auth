const express= require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')

router.get('/register',userController.viewRegisterController )
router.post('/register',userController.registerUserController )
router.get('/login', userController.viewLoginController)
router.post('/login', userController.loginUserController)
router.get('/feeds', userMiddleware.authUser,userController.viewFeedsController)






module.exports = router;