import {Router} from 'express';
import {router as userRouter} from './user';
import {router as groupRouter} from './group';
import {router as authenticate} from './authenticate';
import {checkToken} from "../middlewares/checkToken";

const router = Router();

router.use('/', authenticate, checkToken, userRouter, groupRouter);

export {router}