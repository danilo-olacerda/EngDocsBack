interface IOccurrence {
    id?: number
    timeInit: string
    timeEnd: string
    item: string
    description: string
    dailyPartId: number
}

interface IDailyPart {
    id?: number
    date: string
    build: string | number
    climate: string
    numberDays: number
    remainingDays: number
    supply: string
    contractor: string
    hired: string
    occurrences: Array<IOccurrence>
}

export { IDailyPart, IOccurrence };