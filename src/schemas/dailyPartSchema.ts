import joi from 'joi';

const occurrence = joi.object().keys({
    timeInit: joi.string().required(),
    timeEnd: joi.string().required(),
    item: joi.string().required(),
    description: joi.string().required(),
    dailyPartId: joi.number()
});

const occurrences = joi.array().items(occurrence);

export const dailyPartSchema = joi.object({
    date: joi.date().required(),
    build: joi.string().required(),
    climate: joi.string().required(),
    numberDays: joi.number().required(),
    remainingDays: joi.number().required(),
    supply: joi.string().required(),
    contractor: joi.string().required(),
    hired: joi.string().required(),
    occurrences: occurrences
});