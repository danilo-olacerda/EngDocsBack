import * as userRepository from '../repositories/userRepository';

export async function getUserByEmail(email: string) {

    const user = await userRepository.getUserByEmail(email);

    return user;

}