import { user } from "@prisma/client";

export type IUserData = Omit<user, 'id'>;