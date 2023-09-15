import { FastifyInstance } from "fastify";
import { transcriptionControllers } from "../controllers/transcriptionControllers";



export async function TranscriptionRoutes(app: FastifyInstance) {
    app.post('/videos/:videoId/transcription', transcriptionControllers.createTranscription)
}


