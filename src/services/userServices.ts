import { userRepositories } from "../repositories/userRepository";


async function userHandler(id: string) {
    const exists = await userRepositories.userExists(id);
    if (!exists) {
        userRepositories.createUser(id);
    }
}

type auth = {
    err: string
}
async function authHandler(id: string): Promise<auth | null> {
    const availableTokens = await userRepositories.tokenHandler(id);
    if (availableTokens?.err) {
        return (availableTokens);
    }
    return null
}   

async function getUserbyId(id:string) {
    const videos = await userRepositories.listVideos(id)
    return videos
}



export const userServices = { userHandler, authHandler,getUserbyId };