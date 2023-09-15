import { FastifyInstance } from "fastify";
import { aiCompletionControllers } from "../controllers/aiCompletionController";



export async function generateAiCompletion(app: FastifyInstance) {
    app.post('/ai/complete', aiCompletionControllers.aiCompletion)
}