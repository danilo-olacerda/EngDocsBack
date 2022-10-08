import * as dailyRepository from '../repositories/dailyRepository';
import { IDailyPart } from "../types/dailyPart";
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