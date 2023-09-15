import { userRepositories } from "../repositories/userRepositories"

type UserT = {
    name: string,
    email: string,
    password: string,
    phone: string
}
async function createUser(user:UserT) {
    const userExists = userRepositories.findUser(user.email);
    if(userExists == null){ throw 'already exists'};
    

}







export const userServices = { createUser }