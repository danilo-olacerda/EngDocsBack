import { prisma } from '../db/prisma';

export async function registerUser(name: string, email: string, password: string, companyId: number, admin: boolean = false) {
    return await prisma.user.create({
        data: {
            name,
            email,
            password,
            companyId,
            admin
        }
    });
}