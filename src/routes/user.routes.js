var userRouter = require('express').Router();
const userController = require('../controller/user.controller');

userRouter.get('/', userController.logIn);
userRouter.post('/login', userController.logIn);
userRouter.post('/signUp', userController.signUp);
userRouter.post('/refreshToken', userController.refreshToken);



module.exports =  userRouter;
