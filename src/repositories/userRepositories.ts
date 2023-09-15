import { prisma } from "../lib/prisma";

type UserT = {
    name: string,
    email: string,
    password: string,
    phone: string
}

async function findUser(email: string):Promise<UserT | null>{
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        return user || null;
    } catch (error) {
        throw error;
    }
}


async function insertUser(user: UserT) {

}



export const userRepositories = { findUser, insertUser }