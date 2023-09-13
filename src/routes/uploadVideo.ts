import { fastifyMultipart } from '@fastify/multipart'
import { FastifyInstance } from "fastify";
import path from 'node:path';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { prisma } from '../lib/prisma';

const pump = promisify(pipeline)

export async function uploadVideosRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1048576 * 25,
        }
    })
    app.post('/videos', async (req, rep) => {
        const data = await req.file()

        if (!data) {
            return rep.status(400).send({
                error: "Missing file"
            });
        }

        const extension = path.extname(data.filename);

        if (extension != '.mp3') {
            return rep.status(400).send({ error: "Invalid file type, please upload MP3" });
        }

        const fileBaseName = path.basename(data.filename, extension);
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
        const uploadDir = path.resolve(__dirname, '../../tmp', fileUploadName);

        await pump(data.file, fs.createWriteStream(uploadDir));
        const video = await prisma.video.create({
            data: {
                name: data.filename,
                path: uploadDir,
            }
        })

        return ({ video })
    })


}