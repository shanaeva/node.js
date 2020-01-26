import express from 'express';
import { getUsersList, getUser, createUser, deleteUser, updateUser, getAutoSuggestUsers } from '../data-accets/user-helper';
import { createValidator } from 'express-joi-validation';
import { querySchema } from '../schemes/schema';
import { TUser } from '../types/types';

const validator = createValidator();

export const router = express.Router();

router.route('/users')
    .get(async (req, res) => {
        const { login } = req.query;
        if (login) {
            return res.json(await getAutoSuggestUsers(req.query));
        }
        res.json(await getUsersList());
    })
    .post(validator.body(querySchema), async (req, res) => {
        res.json(await createUser(req.body));
    });

router.route('/users/:id')
    .get(async (req, res) => {
        const user: TUser = await getUser(req.params.id);
        if (!user) {
            return res.status(404)
                .json({ message: `User with id ${req.params.id} not found` });
        }
        res.json(user);
    })
    .delete(async (req, res) => {
        const user: number = await deleteUser(req.params.id);
        if (!user) {
            return res.status(404)
                .json({ message: `User with id ${req.params.id} not found` });
        }
        res.json(user);
    })
    .put(validator.body(querySchema), async (req, res) => {
        const user: [number, TUser[]] = await updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404)
                .json({ message: `User with id ${req.params.id} not found` });
        }
        res.json(user);
    });

