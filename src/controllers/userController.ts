import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { userServices } from "../services/userServices";



async function login(req: FastifyRequest, res: FastifyReply) {


}



async function signup(req: FastifyRequest, res: FastifyReply) {
    const userSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string()
    })
    const user = userSchema.parse(req.body);
    await userServices.createUser(user);
}




export const userController = { login, signup }