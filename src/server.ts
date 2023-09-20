import { fastify } from "fastify";
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from "./routes/getallprompts";
import { uploadVideosRoute } from "./routes/uploadVideo";
import { generateAiCompletion } from "./routes/generateAICompletion";
import { TranscriptionRoutes } from "./routes/transcriptionRoutes";
import { UserRoutes } from "./routes/userRoutes";

const app = fastify()
const port = process.env.PORT || 3000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

app.register(fastifyCors, {
    origin: '*',
})


app.register(getAllPromptsRoute);
app.register(uploadVideosRoute);
app.register(TranscriptionRoutes);
app.register(generateAiCompletion);
app.register(UserRoutes)






app.listen({
    host: host,
    port: 3333
}).then(() => {
    console.log('Running')
}
)