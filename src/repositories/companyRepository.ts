import { prisma } from '../db/prisma';

export async function registerCompany(name: string, address: string, cep: string) {
    return await prisma.company.create({
        data: {
            name,
            address,
            cep
        }
    });
}