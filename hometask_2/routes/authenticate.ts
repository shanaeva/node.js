import express from 'express';
import { getOneUserByLogin } from '../controllers/authenticate';

export const router = express.Router();

router.route('/authenticate')
    .post(getOneUserByLogin);
