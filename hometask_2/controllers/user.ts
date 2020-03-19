import express from 'express';
import { getUsersList, getUser, createUser, deleteUser, updateUser, getAutoSuggestUsers } from '../services/user';
import { createValidator } from 'express-joi-validation';
import { UserSchema, UserSchemaNoRequired } from '../schemes/user';
import { TUser } from '../types/user';

const validator = createValidator();

export const router = express.Router();

router.route('/users')
    .get(async (req, res, next) => {
        try {
            const { login } = req.query;
            if (login) {
                return res.json(await getAutoSuggestUsers(req.query));
            }
            res.json(await getUsersList());
        }
        catch (err) {
            return next(err);
        }
    })

    .post(validator.body(UserSchema), async (req, res, next) => {
        try {
            res.json(await createUser(req.body));
        }
        catch (err) {
            return next(err);
        }
    });

router.route('/users/:id')
    .get(async (req, res, next) => {
        try {
            const user: TUser = await getUser(Number(req.params.id));
            if (!user) {
                return res.status(404)
                    .json({ message: `User with id ${req.params.id} not found` });
            }
            res.json(user);
        }
        catch (err) {
            return next(err);
        }
    })

    .delete(async (req, res, next) => {
        try {
            const result: [number, TUser[]] = await deleteUser(Number(req.params.id));
            if (!result[0]) {
                return res.status(404)
                    .json({ message: `User with id ${req.params.id} not found` });
            }
            res.json(result);
        }
        catch (err) {
            return next(err)
        }
    })

    .put(validator.body(UserSchemaNoRequired), async (req, res, next) => {
        try {
            const result: [number, TUser[]] = await updateUser(Number(req.params.id), req.body);
            if (!result[0]) {
                return res.status(404)
                    .json({ message: `User with id ${req.params.id} not found` });
            }
            res.json(result);
        }
        catch (err) {
            return next(err)
        }
    });
