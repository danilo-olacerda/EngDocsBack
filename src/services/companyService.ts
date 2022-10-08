import * as companyRepository from '../repositories/companyRepository';

export async function registerCompany(companyName: string, companyAddress: string, companyCEP: string) {

    const company = await companyRepository.registerCompany(companyName, companyAddress, companyCEP);

    return company;

}