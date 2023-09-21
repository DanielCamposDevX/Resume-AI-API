import { prisma } from "../lib/prisma"


type existence = { id: string }


async function userExists(id: string): Promise<existence | null> {
    const exist = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return exist
}

async function createUser(id: string) {
    await prisma.user.create({
        data: {
            id: id
        }
    })
}


async function tokenHandler(userId: string) {
    const existingSessions = await prisma.sessions.count({
        where: {
            userId: userId
        }
    });
    if (existingSessions < 3) {
        await prisma.sessions.create({
            data: {
                userId: userId
            }
        });
    } else {
        return ({err:"Maximum session limit reached for user"});
    }
}


async function listVideos(id:string) {
    const videos = await prisma.video.findMany({
        where:{
            userId:id
        }
    })
    return videos
}


export const userRepositories = { userExists, tokenHandler, createUser,listVideos }