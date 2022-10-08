import { Request, Response } from "express";
import INewUser from "../types/newUser";
import * as authService from "../services/authService";

export async function register(req: Request, res: Response) {

  const newUser: INewUser = req.body;

  const companyId = await authService.register(newUser)

  res.status(201).send({companyId});

}

export async function login(req: Request, res: Response) {
  
  const { email, password } = req.body;

  const token = await authService.login(email, password);

  res.send({token});

}