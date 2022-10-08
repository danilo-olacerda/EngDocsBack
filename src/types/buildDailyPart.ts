interface mod {
    id?: number;
    effectiveId?: number;
    name: string;
}

interface moi {
    id?: number;
    effectiveId?: number;
    name: string;
}

interface effective {
    id?: number;
    buildDailyPartId?: number;
    mod: Array<mod>;
    moi: Array<moi>;
}

interface equipment {
    id?: number;
    buildDailyPartId?: number;
    name: string;
}

interface buildDailyOccurrence {
    id?: number;
    description: string;
    buildDailyPartId?: number;
}

interface service {
    id?: number;
    description: string;
    buildDailyPartId?: number;
}

interface IBuildDailyPart {
    id?: number;
    date: string;
    companyId?: number;
    build?: number | string;
    climate: string;
    numberDays: number;
    remainingDays: number;
    supply: string
    contractor: string
    hired: string
    effective: Array<effective>;
    equipment: Array<equipment>;
    buildDailyOccurrence: Array<buildDailyOccurrence>;
    service: Array<service>;
}

export { IBuildDailyPart, effective, equipment, buildDailyOccurrence, service, mod, moi };