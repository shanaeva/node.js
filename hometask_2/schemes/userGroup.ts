import Joi from '@hapi/joi';

export const UsersGroupSchema: Joi.Schema = Joi.object({
    user_ids: Joi.array().items(Joi.number().integer()),
    group_id: Joi.number().integer(),
});