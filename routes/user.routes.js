/* eslint-disable import/extensions */
import express from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/create', userController.createUser);

export default userRouter;
