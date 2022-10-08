import { prisma } from '../db/prisma';

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email
        }
    });
}