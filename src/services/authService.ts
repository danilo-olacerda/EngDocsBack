import * as authRepository from '../repositories/authRepository';
import * as userService from './userService';
import * as companyService from './companyService';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import INewUser from "../types/newUser";

dotenv.config();


export async function register(newUser: INewUser) {

    const { name, email, password, companyAddress, companyCEP, companyName } = newUser;

    const user = await userService.getUserByEmail(email);

    if (user) {
        throw {type: 'conflict', message: 'Email already in use'};
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const companyId = (await companyService.registerCompany(companyName, companyAddress, companyCEP)).id;

    await authRepository.registerUser(name, email, hashedPassword, companyId, true);

    return companyId;

}

export async function login(email: string, password: string) {
    
    const user = await userService.getUserByEmail(email);

    if (!user) {
        throw {type: 'unauthorized', message: 'Invalid email or password'};
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw {type: 'unauthorized', message: 'Invalid email or password'};
    }

    const SECRET = process.env.JWT_SECRET as string;
    const EXPIRES_IN = process.env.JWT_EXPIRES;

    const payload = {
        id: user.id,
        email: user.email,
        companyId: user.companyId,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

    return token;
    
}
