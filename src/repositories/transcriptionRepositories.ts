import { prisma } from "../lib/prisma"

async function findVideo(videoId: string) {
  const video = await prisma.video.findUniqueOrThrow({
    where: {
      id: videoId,
    }
  })
  return video;
}



async function updateVideo(videoId: string, transcription: string, videoName: string, userId: string) {
  await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      transcription,
      name: videoName,
      createdBy: userId 
    },
  });
}




export const transcriptionRepositories = { findVideo, updateVideo }