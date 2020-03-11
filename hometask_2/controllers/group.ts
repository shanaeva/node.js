import express from 'express';
import { getGroupsList, getGroup, createGroup, deleteGroup, updateGroup, getAutoSuggestGroups } from '../services/group';
import { createValidator } from 'express-joi-validation';
import { GroupSchema } from '../schemes/group';
import { TGroup } from '../types/group';
import { createUserGroup, addUsersToGroup } from '../services/userGroup';
import { UserGroupSchema } from '../schemes/userGroup';

const validator = createValidator();

export const router = express.Router();

router.route('/groups')
    .get(async (req, res) => {
        const { name } = req.query;
        if (name) {
            return res.json(await getAutoSuggestGroups(req.query));
        }
        res.json(await getGroupsList());
    })
    .post(validator.body(GroupSchema), async (req, res) => {
        res.json(await createGroup(req.body));
    });

router.route('/groups/:id(\\d+)')
    .get(async (req, res) => {
        const group: TGroup = await getGroup(Number(req.params.id));
        if (!group) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(group);
    })
    .delete(async (req, res) => {
        const group: number = await deleteGroup(Number(req.params.id));
        if (!group) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(group);
    })
    .put(validator.body(GroupSchema), async (req, res) => {
        const group: [number, TGroup[]] = await updateGroup(Number(req.params.id), req.body);
        if (!group) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(group);
    });

router.route('/groups/user/')
    .post(validator.body(UserGroupSchema), async (req, res) => {
        res.json(await createUserGroup(req.body));
    });

router.route('/groups/users')
    .post(async (req, res) => {
        res.json(await addUsersToGroup(req.body));
    });
