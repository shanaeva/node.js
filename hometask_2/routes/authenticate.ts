import express from 'express';
import { getOneUserByLogin } from '../controllers/authenticate';

export const router = express.Router();

router.route('/authenticate')
    .post(async (req, res, next) => getOneUserByLogin(req, res, next));
