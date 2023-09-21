
import { z } from 'zod';
import { FastifyReply, FastifyRequest } from "fastify";
import { userServices } from '../services/userServices';



async function createUser(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
        id: z.string(),
    })
    const { id } = bodySchema.parse(req.body);
    if (!id) { throw 'no ID error' };
    await userServices.userHandler(id)
    return res.status(201).send('Criado')
}



async function authUser(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
        id: z.string(),
    })
    const { id } = bodySchema.parse(req.body);
    if (!id) { res.code(404).send("ID NOT PROVIDED") };

    const available = await userServices.authHandler(id)
    if (available?.err) {
        return res.code(401).send(available.err)
    }
    return res.code(201).send('Criado')
}


async function videobyId(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
        userId: z.string(),
    })
    const { userId } = paramsSchema.parse(req.params);
    const videos = await userServices.getUserbyId(userId);
    res.send(videos);
}



export const userControllers = { createUser, authUser, videobyId };