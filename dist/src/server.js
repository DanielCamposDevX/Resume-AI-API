"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const cors_1 = require("@fastify/cors");
const getallprompts_1 = require("./routes/getallprompts");
const uploadVideo_1 = require("./routes/uploadVideo");
const generateAICompletion_1 = require("./routes/generateAICompletion");
const transcriptionRoutes_1 = require("./routes/transcriptionRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const prisma_1 = require("./lib/prisma");
const app = (0, fastify_1.fastify)();
const port = process.env.PORT || 3000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;
app.register(cors_1.fastifyCors, {
    origin: '*',
});
app.register(getallprompts_1.getAllPromptsRoute);
app.register(uploadVideo_1.uploadVideosRoute);
app.register(transcriptionRoutes_1.TranscriptionRoutes);
app.register(generateAICompletion_1.generateAiCompletion);
app.register(userRoutes_1.UserRoutes);
function limparSessoesDoBanco() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.prisma.sessions.deleteMany({});
            console.log('Sessões do banco limpas.');
        }
        catch (error) {
            console.error('Erro ao limpar as sessões do banco:', error);
        }
    });
}
// Agendando a função de limpeza para ser executada a cada 24 horas
setInterval(limparSessoesDoBanco, 86400000); // Roda a cada 24 horas
app.listen({
    host: host,
    port: 3333
}).then(() => {
    console.log('Running');
});
