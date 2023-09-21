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
exports.aiCompletionControllers = void 0;
const zod_1 = require("zod");
const aiCompletionServices_1 = require("../services/aiCompletionServices");
const ai_1 = require("ai");
function aiCompletion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodySchema = zod_1.z.object({
            videoId: zod_1.z.string().uuid(),
            prompt: zod_1.z.string(),
            temperature: zod_1.z.number().min(0).max(1).default(0.5),
        });
        const { videoId, prompt, temperature } = bodySchema.parse(req.body);
        const stream = yield aiCompletionServices_1.aiCompletionServices.aiCompletion(videoId, prompt, temperature);
        (0, ai_1.streamToResponse)(stream, res.raw, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            },
        });
    });
}
exports.aiCompletionControllers = { aiCompletion };
