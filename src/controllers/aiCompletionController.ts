import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { aiCompletionServices } from "../services/aiCompletionServices";
import { streamToResponse } from "ai";



async function aiCompletion(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
        videoId: z.string().uuid(),
        prompt: z.string(),
        temperature: z.number().min(0).max(1).default(0.5),
    })


    const { videoId, prompt, temperature } = bodySchema.parse(req.body);
    const stream = await aiCompletionServices.aiCompletion(videoId, prompt, temperature);
    streamToResponse(stream, res.raw, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
    })
}










export const aiCompletionControllers = { aiCompletion }