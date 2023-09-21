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
exports.aiCompletionServices = void 0;
const ai_1 = require("ai");
const openai_1 = require("../lib/openai");
const aiCompletionRepositories_1 = require("../repositories/aiCompletionRepositories");
function aiCompletion(videoId, prompt, temperature) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = yield aiCompletionRepositories_1.aiCompletionRepositories.findVideoId(videoId);
        if (!video.transcription) {
            throw 'error(404)';
        }
        const promptMessage = prompt.replace('{transcription}', video.transcription);
        const response = yield openai_1.openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature,
            messages: [
                { role: 'user', content: promptMessage }
            ],
            stream: true,
        });
        const stream = (0, ai_1.OpenAIStream)(response);
        return stream;
    });
}
exports.aiCompletionServices = { aiCompletion };
