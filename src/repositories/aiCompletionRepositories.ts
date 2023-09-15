import { prisma } from "../lib/prisma"

type VideoT = {
    id: string,
    name: string,
    path: string,
    transcription: string | null,
    createdAt: Date
}

async function findVideoId(videoId: string): Promise<VideoT> {
    const video = await prisma.video.findUniqueOrThrow({
        where: {
            id: videoId
        }
    })
    return video

}











export const aiCompletionRepositories = { findVideoId }