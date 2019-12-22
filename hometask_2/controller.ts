import express from 'express';
import { getUsersList, getUser, createUser, deleteUser, updateUser, getAutoSuggestUsers } from './dataHelper';
import { createValidator } from 'express-joi-validation';
import { querySchema } from './schema';
import { TUser } from './types';

const validator = createValidator();

export const router = express.Router();

router.route('/users')
    .get((req, res) => {
        const { login } = req.query;
        if (login) {
            return res.json(getAutoSuggestUsers(req.query));
        }
        res.json(getUsersList());
    })
    .post(validator.body(querySchema), (req, res) => {
        res.json(createUser(req.body));
    });

router.route('/users/:id')
    .get((req, res) => {
        const user: TUser = getUser(req.params.id);
        if (!user) {
            return res.status(404)
                .json({ message: `User with id ${req.params.id} not found` });
        }
        res.json(user);
    })
    .delete((req, res) => {
        const user: TUser | boolean = deleteUser(req.params.id);
        if (!user) {
            return res.status(404)
                .json({ message: `User with id ${req.params.id} not found` });
        }
        res.json(user);
    })
    .put(validator.body(querySchema), (req, res) => {
        const user: TUser = updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404)
                .json({ message: `User with id ${req.params.id} not found` });
        }
        res.json(user);
    });

