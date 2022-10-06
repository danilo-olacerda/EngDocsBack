import { company } from "@prisma/client";

export type ICompanyData = Omit<company, 'id'>;