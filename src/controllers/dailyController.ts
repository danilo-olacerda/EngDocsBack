import { Request, Response } from "express";
import { IDailyPart } from "../types/dailyPart";
import IUser from "../types/userPayload";
import * as dailyService from "../services/dailyService";

export async function createDailyPart(req: Request, res: Response) {

    const user: IUser = res.locals.user;

    const dailyPart: IDailyPart = req.body;

    dailyPart.numberDays = Number(dailyPart.numberDays);
    dailyPart.remainingDays = Number(dailyPart.remainingDays);

    const dailyPartCreated = await dailyService.createDailyPart(dailyPart, user);

    res.status(201).send(dailyPartCreated);
}

export async function getDailyParts(req: Request, res: Response) {
    
    const user: IUser = res.locals.user;

    const dailyParts = await dailyService.getDailyParts(user);

    res.status(200).send(dailyParts);
}

export async function getDailyPartById(req: Request, res: Response) {

    const user: IUser = res.locals.user;

    const id = Number(req.params.id);

    const dailyPart = await dailyService.getDailyPartById(id, user);

    res.status(200).send(dailyPart);
    
}