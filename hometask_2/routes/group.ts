import express from 'express';
import { createValidator } from 'express-joi-validation';
import { GroupSchema, GroupSchemaNoRequired } from '../schemes/group';
import { UsersGroupSchema } from '../schemes/userGroup';
import { getGroups, postGroup, getOneGroup, deleteOneGroup, putGroup, postAddUsersToGroup } from '../controllers/group';

const validator = createValidator();

export const router = express.Router();

router.route('/groups')
    .get(async (req, res, next) => getGroups(req, res, next))

    .post(validator.body(GroupSchema), async (req, res, next) => postGroup(req, res, next));

router.route('/groups/:id(\\d+)')
    .get(async (req, res, next) => getOneGroup(req, res, next))

    .delete(async (req, res, next) => deleteOneGroup(req, res, next))

    .put(validator.body(GroupSchemaNoRequired), async (req, res, next) => putGroup(req, res, next));

router.route('/groups/users')
    .post(validator.body(UsersGroupSchema), async (req, res, next) => postAddUsersToGroup(req, res, next));
