import { prisma } from "../lib/prisma";

type UserT = {
    id: string,
    name: string,
    email: string,
    password: string,
    phone: string
}

type UserF = {
    name: string,
    email: string,
    password: string,
    phone: string
}

type Session = {
    token: string,
    userId: string,
    lastChange: Date,

}

async function findUser(email: string): Promise<UserT | null> {
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    return user || null;
}


async function insertUser(user: UserF) {
    await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone
        }
    })
}

async function alreadyLogged(id: string): Promise<Session | null> {
    const test = await prisma.session.findFirst({
        where: {
            userId: id
        }
    })
    return test
}

async function login(userId: string): Promise<Session | null> {
    const id = await prisma.session.create({
        data: {
            userId: userId
        }
    })
    return id || null
}


export const userRepositories = { findUser, insertUser, alreadyLogged, login }