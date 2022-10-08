import joi from 'joi';

export const newUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
    companyName: joi.string().required(),
    companyAddress: joi.string().required(),
    companyCEP: joi.string().required().length(8),
});