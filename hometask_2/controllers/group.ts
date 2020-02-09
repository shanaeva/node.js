import express from 'express';
import { getGroupsList, getGroup, createGroup, deleteGroup, updateGroup, getAutoSuggestGroups } from '../services/group';
import { createValidator } from 'express-joi-validation';
import { GroupSchema } from '../schemes/group';
import { TGroup } from '../types/group';
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

router.route('/groups/:id')
    .get(async (req, res) => {
        const Group: TGroup = await getGroup(Number(req.params.id));
        if (!Group) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(Group);
    })
    .delete(async (req, res) => {
        const Group: number = await deleteGroup(Number(req.params.id));
        if (!Group) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(Group);
    })
    .put(validator.body(GroupSchema), async (req, res) => {
        const Group: [number, TGroup[]] = await updateGroup(Number(req.params.id), req.body);
        if (!Group) {
            return res.status(404)
                .json({ message: `Group with id ${req.params.id} not found` });
        }
        res.json(Group);
    });
