import {getUsersList, getUser, createUser, deleteUser, updateUser, getAutoSuggestUsers } from '../services/user';
import { TUser } from '../types/user';

export const getUsers = async (req, res, next) => {
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
}

export const postCreateUser = (async (req, res, next) => {
    try {
        const user: TUser = await createUser(req.body);
        if (!user) {
            return res.status(404)
                .json({ message: `User with login ${req.body.login} already exists` });
        }
        res.json(user);
    }
    catch (err) {
        return next(err);
    }
}

export const getOneUser = async (req, res, next) => {
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
}
export const deleteOneUser = async (req, res, next) => {
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
}

export const putUser =  async (req, res, next) => {
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
}


