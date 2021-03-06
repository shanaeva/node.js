import Joi from '@hapi/joi';

export const UserSchema: Joi.Schema = Joi.object({
    login: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().integer().max(130).min(3).required(),
    isDelete: Joi.boolean()
});

export const UserSchemaNoRequired: Joi.Schema = Joi.object({
    login: Joi.string().alphanum(),
    password: Joi.string().alphanum(),
    age: Joi.number().integer().max(130).min(3),
    isDelete: Joi.boolean()
});