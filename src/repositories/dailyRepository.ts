import { prisma } from "../db/prisma";
import { IDailyPart, IOccurrence } from "../types/dailyPart";
import { IBuildDailyPart, effective, moi, mod } from "../types/buildDailyPart";
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

export async function createBuildDailyPart(buildDailyPart: IBuildDailyPart, user: IUser) {

    const buildDailyPartCreated = await prisma.buildDailyPart.create({
        data: {
            buildId: buildDailyPart.build as number,
            date: buildDailyPart.date,
            companyId: user.companyId,
            climate: buildDailyPart.climate,
            numberDays: buildDailyPart.numberDays,
            remainingDays: buildDailyPart.remainingDays,
            supply: buildDailyPart.supply,
            contractor: buildDailyPart.contractor,
            hired: buildDailyPart.hired,
        }
    });

    return buildDailyPartCreated;

}

export async function createEffective(buildDailyPartId: number) {

    const effectiveCreated = await prisma.effective.create({
        data: {
            buildDailyPartId: buildDailyPartId
        }
    });

    return effectiveCreated;

}

export async function createMoi(moi: moi) {

    const moiCreated = await prisma.moi.create({
        data: {
            effectiveId: moi.effectiveId as number,
            name: moi.name,
        }
    });

    return moiCreated;

}

export async function createMod(mod: mod) {

    const modCreated = await prisma.mod.create({
        data: {
            effectiveId: mod.effectiveId as number,
            name: mod.name,
        }
    });

    return modCreated;

}

export async function createEquipment(buildDailyPartId: number, name: string) {

    const equipmentCreated = await prisma.equipment.create({
        data: {
            buildDailyPartId: buildDailyPartId,
            name: name
        }
    });

    return equipmentCreated;

}

export async function createBuildDailyOccurrence(buildDailyPartId: number, description: string) {

    const buildDailyOccurrenceCreated = await prisma.buildDailyOccurrence.create({
        data: {
            buildDailyPartId: buildDailyPartId,
            description: description
        }
    });

    return buildDailyOccurrenceCreated;

}

export async function createService(buildDailyPartId: number, description: string) {
    
    const serviceCreated = await prisma.service.create({
        data: {
            buildDailyPartId: buildDailyPartId,
            description: description
        }
    });

    return serviceCreated;
    
}

export async function getBuildDailyParts(user: IUser) {

    const buildDailyParts = await prisma.buildDailyPart.findMany({
        where: {
            companyId: user.companyId
        },
        include: {
            build: true,
            effective: {
                include: {
                    moi: true,
                    mod: true
                }
            },
            equipment: true,
            buildDailyOccurrence: true,
            service: true
        }
    });

    return buildDailyParts;

}

export async function getBuildDailyPartById(id: number) {

    const buildDailyPart = await prisma.buildDailyPart.findFirst({
        where: {
            id: id
        },
        include: {
            build: true,
            effective: {
                include: {
                    moi: true,
                    mod: true
                }
            },
            equipment: true,
            buildDailyOccurrence: true,
            service: true
        }
    });

    return buildDailyPart;

}