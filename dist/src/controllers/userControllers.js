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
exports.userControllers = void 0;
const zod_1 = require("zod");
const userServices_1 = require("../services/userServices");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodySchema = zod_1.z.object({
            id: zod_1.z.string(),
        });
        const { id } = bodySchema.parse(req.body);
        if (!id) {
            throw 'no ID error';
        }
        ;
        yield userServices_1.userServices.userHandler(id);
        return res.status(201).send('Criado');
    });
}
function authUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodySchema = zod_1.z.object({
            id: zod_1.z.string(),
        });
        const { id } = bodySchema.parse(req.body);
        if (!id) {
            res.code(404).send("ID NOT PROVIDED");
        }
        ;
        const available = yield userServices_1.userServices.authHandler(id);
        if (available === null || available === void 0 ? void 0 : available.err) {
            return res.code(401).send(available.err);
        }
        return res.code(201).send('Criado');
    });
}
function videobyId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const paramsSchema = zod_1.z.object({
            userId: zod_1.z.string(),
        });
        const { userId } = paramsSchema.parse(req.params);
        const videos = yield userServices_1.userServices.getUserbyId(userId);
        res.send(videos);
    });
}
exports.userControllers = { createUser, authUser, videobyId };
