import express from 'express';
import { createValidator } from 'express-joi-validation';
import { createUserGroup, addUsersToGroup } from '../services/userGroup';
import { UserGroupSchema } from '../schemes/userGroup';

const validator = createValidator();

export const router = express.Router();

router.route('/userGroup')
    .post(validator.body(UserGroupSchema), async (req, res) => {
        res.json(await createUserGroup(req.body));
    });

router.route('/usersGroup')
    .post(async (req, res) => {
        res.json(await addUsersToGroup(req.body));
    });    