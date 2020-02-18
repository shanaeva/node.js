import Joi from '@hapi/joi';

export const UserGroupSchema: Joi.Schema = Joi.object({
    user_id: Joi.number().integer(),
    group_id: Joi.number().integer(),
});