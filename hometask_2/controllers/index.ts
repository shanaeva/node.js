import {Router} from 'express';
import {router as userRouter} from './user';
import {router as groupRouter} from './group';

const router = Router();

router.use('/', userRouter, groupRouter);

export {router}