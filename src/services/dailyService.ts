import * as dailyRepository from '../repositories/dailyRepository';
import { IDailyPart } from "../types/dailyPart";
import { IBuildDailyPart } from "../types/buildDailyPart";
import IUser from "../types/userPayload";

export async function createDailyPart(dailyPart: IDailyPart, user: IUser) {

    let buildExists = await dailyRepository.findBuild(dailyPart.build as string);

    if (!buildExists) {
        buildExists = await dailyRepository.newBuild(dailyPart.build as string);
    }

    dailyPart.build = buildExists.id;

    const dailyPartCreated = await dailyRepository.createDailyPart(dailyPart, user);

    for (let occurrence of dailyPart.occurrences) {
        occurrence.dailyPartId = dailyPartCreated.id;
        await dailyRepository.createOccurrence(occurrence);
    }

    return dailyPartCreated;

}

export async function getDailyParts(user: IUser) {
    
    const dailyParts = await dailyRepository.getDailyParts(user);

    return dailyParts;
    
}

export async function getDailyPartById(id: number, user: IUser) {
        
    const dailyPart = await dailyRepository.getDailyPartById(id, user);

    if (!dailyPart) {
        throw { type: "notFound", message: "Daily Part not found" };
    }

    if (dailyPart.companyId !== user.companyId) {
        throw { type: "unauthorized", message: "User unauthorized" };
    }

    return dailyPart;
        
}

export async function createBuildDailyPart(buildDailyPart: IBuildDailyPart, user: IUser) {

    let buildExists = await dailyRepository.findBuild(buildDailyPart.build as string);

    if (!buildExists) {
        buildExists = await dailyRepository.newBuild(buildDailyPart.build as string);
    }

    buildDailyPart.build = buildExists.id;

    const createdBuildDailyPart = await dailyRepository.createBuildDailyPart(buildDailyPart, user);

    for (let effective of buildDailyPart.effective) {
        const createdEffective = await dailyRepository.createEffective(createdBuildDailyPart.id);

        for (let moi of effective.moi) {
            moi.effectiveId = createdEffective.id;
            await dailyRepository.createMoi(moi);
        }

        for (let mod of effective.moi) {
            mod.effectiveId = createdEffective.id;
            await dailyRepository.createMod(mod);
        }
    }

    for (let equipment of buildDailyPart.equipment) {
        equipment.buildDailyPartId = createdBuildDailyPart.id;
        await dailyRepository.createEquipment(equipment.buildDailyPartId, equipment.name);
    }

    for (let buildDailyOccurrence of buildDailyPart.buildDailyOccurrence) {
        buildDailyOccurrence.buildDailyPartId = createdBuildDailyPart.id;
        await dailyRepository.createBuildDailyOccurrence(buildDailyOccurrence.buildDailyPartId, buildDailyOccurrence.description);
    }

    for (let service of buildDailyPart.service) {
        service.buildDailyPartId = createdBuildDailyPart.id;
        await dailyRepository.createService(service.buildDailyPartId, service.description);
    }

    return createdBuildDailyPart;

}

export async function getBuildDailyParts(user: IUser) {
        
    const buildDailyParts = await dailyRepository.getBuildDailyParts(user);

    return buildDailyParts;
        
}

export async function getBuildDailyPartById(id: number, user: IUser) {
        
    const buildDailyPart = await dailyRepository.getBuildDailyPartById(id);

    if (!buildDailyPart) {
        throw { type: "notFound", message: "Build Daily Part not found" };
    }

    if (buildDailyPart.companyId !== user.companyId) {
        throw { type: "unauthorized", message: "User unauthorized" };
    }

    return buildDailyPart;
        
}