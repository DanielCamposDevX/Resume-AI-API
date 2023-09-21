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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideosRoute = void 0;
const multipart_1 = require("@fastify/multipart");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_crypto_1 = require("node:crypto");
const node_stream_1 = require("node:stream");
const node_util_1 = require("node:util");
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const pump = (0, node_util_1.promisify)(node_stream_1.pipeline);
function uploadVideosRoute(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.register(multipart_1.fastifyMultipart, {
            limits: {
                fileSize: 1048576 * 20 // 20mb
            }
        });
        app.post('/videos/:id', (req, rep) => __awaiter(this, void 0, void 0, function* () {
            const paramsSchema = zod_1.z.object({
                id: zod_1.z.string(),
            });
            const data = yield req.file();
            const { id } = paramsSchema.parse(req.params);
            if (!data) {
                return rep.status(400).send({
                    error: "Missing file"
                });
            }
            const extension = node_path_1.default.extname(data.filename);
            if (extension != '.mp3') {
                return rep.status(400).send({ error: "Invalid file type, please upload MP3" });
            }
            const fileBaseName = node_path_1.default.basename(data.filename, extension);
            const fileUploadName = `${fileBaseName}-${(0, node_crypto_1.randomUUID)()}${extension}`;
            const uploadDir = node_path_1.default.resolve(__dirname, '../../tmp', fileUploadName);
            yield pump(data.file, node_fs_1.default.createWriteStream(uploadDir));
            const video = yield prisma_1.prisma.video.create({
                data: {
                    name: fileUploadName,
                    path: uploadDir,
                    createdBy: id
                }
            });
            return ({ video });
        }));
    });
}
exports.uploadVideosRoute = uploadVideosRoute;
