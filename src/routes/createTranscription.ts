import { FastifyInstance } from "fastify";
import { transcriptionControllers } from "../controllers/transcriptionControllers";



export async function createTranscriptionRoute(app: FastifyInstance) {
    app.post('/videos/:videoId/transcription', transcriptionControllers.createTranscription)
}