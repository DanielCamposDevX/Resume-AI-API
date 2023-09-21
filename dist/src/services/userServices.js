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
exports.userServices = void 0;
const userRepository_1 = require("../repositories/userRepository");
function userHandler(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield userRepository_1.userRepositories.userExists(id);
        if (!exists) {
            userRepository_1.userRepositories.createUser(id);
        }
    });
}
function authHandler(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const availableTokens = yield userRepository_1.userRepositories.tokenHandler(id);
        if (availableTokens === null || availableTokens === void 0 ? void 0 : availableTokens.err) {
            return (availableTokens);
        }
        return null;
    });
}
function getUserbyId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const videos = yield userRepository_1.userRepositories.listVideos(id);
        return videos;
    });
}
exports.userServices = { userHandler, authHandler, getUserbyId };
