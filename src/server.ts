import { fastify } from "fastify";
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from "./routes/getallprompts";
import { uploadVideosRoute } from "./routes/uploadVideo";
import { generateAiCompletion } from "./routes/generateAICompletion";
import { TranscriptionRoutes } from "./routes/transcriptionRoutes";
import { UserRoutes } from "./routes/userRoutes";
import { prisma } from "lib/prisma";


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


async function limparSessoesDoBanco() {
    try {
        await prisma.sessions.deleteMany({});
        console.log('Sessões do banco limpas.');
    } catch (error) {
        console.error('Erro ao limpar as sessões do banco:', error);
    }
}

// Agendando a função de limpeza para ser executada a cada 24 horas
setInterval(limparSessoesDoBanco, 86400000); // Roda a cada 24 horas




app.listen({
    host: host,
    port: 3333
}).then(() => {
    console.log('Running')
}
)