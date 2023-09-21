import { openai } from "../lib/openai"
import { createReadStream, readdirSync, unlinkSync } from "node:fs";
import { transcriptionRepositories } from "../repositories/transcriptionRepositories";



export async function createTranscription(videoId: string, prompt: string, videoName: string) {
    const video = await transcriptionRepositories.findVideo(videoId);
    const videoPath = video.path;
    const audioReadStream = createReadStream(videoPath);
    try {
        const response = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            language: 'pt',
            response_format: 'json',
            temperature: 0,
            prompt,
        })
        const transcription = response.text
        transcriptionRepositories.updateVideo(videoId, transcription, videoName)

        const tmpFolderPath = '/home/daniel/rocketSeat/Upload.ai-API/tmp';
        const files = readdirSync(tmpFolderPath);

        for (const file of files) {
            const filePath = `${tmpFolderPath}/${file}`;
            unlinkSync(filePath);
        }
        return transcription
    }
    catch (err) {
        return (err)
    }

}


export const transcriptionServices = { createTranscription }