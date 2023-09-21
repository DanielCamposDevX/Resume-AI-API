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
exports.userRepositories = void 0;
const prisma_1 = require("../lib/prisma");
function userExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const exist = yield prisma_1.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return exist;
    });
}
function createUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma_1.prisma.user.create({
            data: {
                id: id
            }
        });
    });
}
function tokenHandler(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingSessions = yield prisma_1.prisma.sessions.count({
            where: {
                userId: userId
            }
        });
        if (existingSessions < 3) {
            yield prisma_1.prisma.sessions.create({
                data: {
                    userId: userId
                }
            });
        }
        else {
            return ({ err: "Maximum session limit reached for user" });
        }
    });
}
function listVideos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const videos = yield prisma_1.prisma.video.findMany({
            where: {
                createdBy: id
            }
        });
        return videos;
    });
}
exports.userRepositories = { userExists, tokenHandler, createUser, listVideos };
