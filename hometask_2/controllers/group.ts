import { getGroupsList, getGroup, createGroup, deleteGroup, updateGroup, getAutoSuggestGroups } from '../services/group';
import { TGroup } from '../types/group';
import { addUsersToGroup } from '../services/userGroup';

export const getGroups = async (req, res, next) => {
    try {
        const { name } = req.query;
        if (name) {
            return res.json(await getAutoSuggestGroups(req.query));
        }
        res.json(await getGroupsList());
    } catch (err) {
        return next(err);
    }
};

export const postGroup = async (req, res, next) => {
    try {
        res.json(await createGroup(req.body));
    } catch (err) {
        return next(err);
    }
};

export const getOneGroup = async (req, res, next) => {
    try {
        const group: TGroup = await getGroup(Number(req.params.id));
        if (!group) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(group);
    } catch (err) {
        return next(err);
    }
}

export const deleteOneGroup = async (req, res, next) => {
    try {
        const numberOfRemoteGroup: number = await deleteGroup(Number(req.params.id));
        if (!numberOfRemoteGroup) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(numberOfRemoteGroup);
    } catch (err) {
        return next(err);
    }
}

export const putGroup = async (req, res, next) => {
    try {
        const result: [number, TGroup[]] = await updateGroup(Number(req.params.id), req.body);
        if (!result[0]) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(result);
    } catch (err) {
        return next(err);
    }
}

export const postAddUsersToGroup = async (req, res, next) => {
    try {
        res.json(await addUsersToGroup(req.body));
    } catch (err) {
        return next(err);
    }
}

