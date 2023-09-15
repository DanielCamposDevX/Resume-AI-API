import { OpenAIStream } from "ai";
import { openai } from "../lib/openai"
import { aiCompletionRepositories } from "../repositories/aiCompletionRepositories";






async function aiCompletion(videoId: string, prompt: string, temperature: number) {
    const video = await aiCompletionRepositories.findVideoId(videoId);
    if (!video.transcription) {
        throw 'error(404)'
    }

    const promptMessage = prompt.replace('{transcription}', video.transcription);

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        temperature,
        messages: [
            { role: 'user', content: promptMessage }
        ],
        stream: true,
    })

    const stream = OpenAIStream(response);

   return stream


}







export const aiCompletionServices = { aiCompletion }