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
exports.transcriptionControllers = void 0;
const zod_1 = require("zod");
const transcriptionService_1 = require("../services/transcriptionService");
function createTranscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const paramsSchema = zod_1.z.object({
            videoId: zod_1.z.string().uuid(),
        });
        const bodySchema = zod_1.z.object({
            prompt: zod_1.z.string(),
            videoName: zod_1.z.string(),
            userId: zod_1.z.string()
        });
        const { videoId } = paramsSchema.parse(req.params);
        const { prompt, videoName, userId } = bodySchema.parse(req.body);
        const transcription = yield transcriptionService_1.transcriptionServices.createTranscription(videoId, prompt, videoName);
        res.status(200).send(transcription);
    });
}
exports.transcriptionControllers = { createTranscription };
