/* eslint-disable import/extensions */
import express from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/create', userController.createUser);
userRouter.get('/verify/:token', userController.verify);

export default userRouter;
