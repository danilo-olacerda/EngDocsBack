import { prisma } from "../db/prisma";
import { IDailyPart, IOccurrence } from "../types/dailyPart";
import IUser from "../types/userPayload";

export async function findBuild(name: string) {

    const build = await prisma.build.findFirst({
        where: {
            name: name
        }
    });
    
    return build;
}

export async function newBuild(name: string) {

    const build = await prisma.build.create({
        data: {
            name: name
        }
    });

    return build;
}

export async function createDailyPart(dailyPart: IDailyPart, user: IUser) {
    
    const dailyPartCreated = await prisma.dailyPart.create({
        data: {
            buildId: dailyPart.build as number,
            date: dailyPart.date,
            companyId: user.companyId,
            climate: dailyPart.climate,
            numberDays: dailyPart.numberDays,
            remainingDays: dailyPart.remainingDays,
            supply: dailyPart.supply,
            contractor: dailyPart.contractor,
            hired: dailyPart.hired,
        }
    });

    return dailyPartCreated;
}

export async function createOccurrence(occurrence: IOccurrence) {

    const occurrenceCreated = await prisma.occurrences.create({
        data: {
            timeInit: occurrence.timeInit,
            timeEnd: occurrence.timeEnd,
            item: occurrence.item,
            description: occurrence.description,
            dailyPartId: occurrence.dailyPartId
        }
    });

    return occurrenceCreated;

}

export async function getDailyParts(user: IUser) {
    
    const dailyParts = await prisma.dailyPart.findMany({
        where: {
            companyId: user.companyId
        },
        include: {
            build: true,
            occurrences: true
        }
    });

    return dailyParts;
    
}

export async function getDailyPartById(id: number, user: IUser) {

    const dailyPart = await prisma.dailyPart.findFirst({
        where: {
            id: id,
            companyId: user.companyId
        },
        include: {
            build: true,
            occurrences: true
        }
    });

    return dailyPart;
    
}