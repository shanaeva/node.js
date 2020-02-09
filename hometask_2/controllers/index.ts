import {Router} from 'express';
import {router as userRouter} from './user';
import {router as groupsRouter} from './group';

const router = Router();

router.use('/', userRouter, groupsRouter);

export {router}