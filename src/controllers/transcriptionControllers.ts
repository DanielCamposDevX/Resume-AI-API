
import { z } from 'zod';
import { FastifyReply, FastifyRequest } from "fastify";
import { transcriptionServices } from '../services/transcriptionService';


async function createTranscription(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
        videoId: z.string().uuid(),
    })
    const bodySchema = z.object({
        prompt: z.string(),
        videoName: z.string(),
        userId: z.string()
    })
    const { videoId } = paramsSchema.parse(req.params);
    const { prompt, videoName, userId } = bodySchema.parse(req.body);

    const transcription = await transcriptionServices.createTranscription(videoId, prompt, videoName)

    res.status(200).send(transcription);
}



export const transcriptionControllers = { createTranscription };