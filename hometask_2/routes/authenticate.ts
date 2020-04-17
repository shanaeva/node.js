import express from 'express';
import { authentication } from '../controllers/authenticate';

export const router = express.Router();

router.route('/authenticate')
    .post(authentication);
