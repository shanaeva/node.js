import express from 'express';
import { UserSchema, UserSchemaNoRequired } from '../schemes/user';
import { getUsers, postCreateUser, getOneUser, deleteOneUser, putUser } from '../controllers/user';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

export const router = express.Router();

router.route('/users')
    .get(getUsers)

    .post(validator.body(UserSchema), (req, res, next) => postCreateUser(req, res, next));

router.route('/users/:id')
    .get(getOneUser)

    .delete(deleteOneUser)

    .put(validator.body(UserSchemaNoRequired), async (req, res, next) => putUser(req, res, next));
