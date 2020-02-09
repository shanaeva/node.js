import Joi from '@hapi/joi';

export const GroupSchema: Joi.Schema = Joi.object({
    name: Joi.string().alphanum().required(),
    permission: Joi.array().items(Joi.string().alphanum().required().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
});