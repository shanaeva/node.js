import express from 'express';
import { getGroupsList, getGroup, createGroup, deleteGroup, updateGroup, getAutoSuggestGroups } from '../services/group';
import { createValidator } from 'express-joi-validation';
import { GroupSchema, GroupSchemaNoRequired } from '../schemes/group';
import { TGroup } from '../types/group';
import { addUsersToGroup } from '../services/userGroup';
import { UsersGroupSchema } from '../schemes/userGroup';

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
        const numberOfRemoteGroup: number = await deleteGroup(Number(req.params.id));
        if (!numberOfRemoteGroup) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(numberOfRemoteGroup);
    })

    .put(validator.body(GroupSchemaNoRequired), async (req, res) => {
        const result: [number, TGroup[]] = await updateGroup(Number(req.params.id), req.body);
        if (!result[0]) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(result);
    });

router.route('/groups/users')
    .post(validator.body(UsersGroupSchema), async (req, res) => {
        res.json(await addUsersToGroup(req.body));
    });
