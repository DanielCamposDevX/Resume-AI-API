import { fastify } from "fastify";
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from "./routes/getallprompts";
import { uploadVideosRoute } from "./routes/uploadVideo";
import { generateAiCompletion } from "./routes/generateAICompletion";
import { TranscriptionRoutes } from "./routes/transcriptionRoutes";
import { userRoutes } from "./routes/userRoutes";

const app = fastify()

app.register(fastifyCors,{
    origin: '*',
})


app.register(getAllPromptsRoute);
app.register(uploadVideosRoute);
app.register(TranscriptionRoutes);
app.register(generateAiCompletion);
app.register(userRoutes);






app.listen({
    port: 3333
}).then(() => {
    console.log('Running')
}
)