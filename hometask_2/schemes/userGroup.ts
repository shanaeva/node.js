import Joi from '@hapi/joi';

const UserGroupSchema: Joi.Schema = Joi.object({
    user_id: Joi.number().integer(),
    group_id: Joi.number().integer(),
});

export const UsersGroupSchema: Joi.Schema = Joi.array().items(UserGroupSchema)