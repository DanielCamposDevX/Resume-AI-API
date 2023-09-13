import { fastify } from "fastify";
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from "./routes/getallprompts";
import { uploadVideosRoute } from "./routes/uploadVideo";
import { createTranscriptionRoute } from "./routes/createTranscription";
import { generateAiCompletion } from "./routes/generateAICompletion";

const app = fastify()

app.register(fastifyCors,{
    origin: '*',
})


app.register(getAllPromptsRoute);
app.register(uploadVideosRoute);
app.register(createTranscriptionRoute);
app.register(generateAiCompletion);






app.listen({
    port: 3333
}).then(() => {
    console.log('Running')
}
)