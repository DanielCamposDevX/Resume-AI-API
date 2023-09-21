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
exports.transcriptionServices = exports.createTranscription = void 0;
const openai_1 = require("../lib/openai");
const node_fs_1 = require("node:fs");
const transcriptionRepositories_1 = require("../repositories/transcriptionRepositories");
function createTranscription(videoId, prompt, videoName) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = yield transcriptionRepositories_1.transcriptionRepositories.findVideo(videoId);
        const videoPath = video.path;
        const audioReadStream = (0, node_fs_1.createReadStream)(videoPath);
        try {
            const response = yield openai_1.openai.audio.transcriptions.create({
                file: audioReadStream,
                model: 'whisper-1',
                language: 'pt',
                response_format: 'json',
                temperature: 0,
                prompt,
            });
            const transcription = response.text;
            transcriptionRepositories_1.transcriptionRepositories.updateVideo(videoId, transcription, videoName);
            const tmpFolderPath = '/home/daniel/rocketSeat/Upload.ai-API/tmp';
            const files = (0, node_fs_1.readdirSync)(tmpFolderPath);
            for (const file of files) {
                const filePath = `${tmpFolderPath}/${file}`;
                (0, node_fs_1.unlinkSync)(filePath);
            }
            return transcription;
        }
        catch (err) {
            return (err);
        }
    });
}
exports.createTranscription = createTranscription;
exports.transcriptionServices = { createTranscription };
