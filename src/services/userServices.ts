import { userRepositories } from "../repositories/userRepositories"

type UserT = {
    id?: string,
    name: string,
    email: string,
    password: string,
    phone: string
}

type UserL = {
    email: string,
    password: string
}

async function createUser(user: UserT) {
    const userExists = await userRepositories.findUser(user.email);
    if (userExists === null) { throw 'already exists' };
    await userRepositories.insertUser(user);
}


async function login(user: UserL) {
    const exists = await userRepositories.findUser(user.email);
    if(user.password != exists?.password){throw 'wrong password'}
    if (!exists) { throw 'not found' }
    const logged = await userRepositories.alreadyLogged(exists.id)
    if (!logged) {
        const login = await userRepositories.login(exists.id)
        return login?.token
    }
    else {
        return (logged.userId)
    }
}






export const userServices = { createUser, login }