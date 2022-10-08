import joi from 'joi';

const mod = joi.object().keys({
    name: joi.string().required()
});

const mods = joi.array().items(mod);

const moi = joi.object().keys({
    name: joi.string().required()
});

const mois = joi.array().items(moi);

const effective = joi.object().keys( {
    mod: mods,
    moi: mois
});

const effectives = joi.array().items(effective);

const equipment  = joi.object().keys({
    name: joi.string().required()
});

const equipments = joi.array().items(equipment);

const buildDailyOccurrence = joi.object().keys({
    description: joi.string().required()
});

const buildDailyOccurrences = joi.array().items(buildDailyOccurrence);

const service = joi.object().keys({
    description: joi.string().required()
});

const services = joi.array().items(service);

export const buildDailyPartSchema = joi.object({
    date: joi.date().required(),
    build: joi.string().required(),
    climate: joi.string().required(),
    numberDays: joi.number().required(),
    remainingDays: joi.number().required(),
    supply: joi.string().required(),
    contractor: joi.string().required(),
    hired: joi.string().required(),
    effective: effectives.required(),
    equipment: equipments.required(),
    buildDailyOccurrence: buildDailyOccurrences.required(),
    service: services.required()
});