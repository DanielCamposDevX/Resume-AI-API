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
exports.transcriptionRepositories = void 0;
const prisma_1 = require("../lib/prisma");
function findVideo(videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = yield prisma_1.prisma.video.findUniqueOrThrow({
            where: {
                id: videoId,
            }
        });
        return video;
    });
}
function updateVideo(videoId, transcription, videoName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma_1.prisma.video.update({
            where: {
                id: videoId,
            },
            data: {
                transcription,
                name: videoName
            },
        });
    });
}
exports.transcriptionRepositories = { findVideo, updateVideo };
