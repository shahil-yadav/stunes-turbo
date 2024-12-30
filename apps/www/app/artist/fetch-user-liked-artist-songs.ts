import {z} from "zod";

async function getArtistIdFromTheSongId(songId:string) {
    const response = await fetch(`/api/songs?songId=${songId}`);
    if(!response.ok)
        throw new Error(`${response.statusText} ${response.status}`);
    const { data } = await response.json();
    const artistIds = data?.at(0).artists?.all?.map((artist) => artist?.id)
    return z.string().array().parse(artistIds)
}

async function createPayloadOfArtistWithSongId(songsIds:string[]) {
    const schema = z.object({artistId:z.string(), songId:z.string()}).array();
    const arr:  z.infer<typeof schema> = []
    for (const songId of songsIds) {
        const artistIds = await getArtistIdFromTheSongId(songId)
        for (const artistId of artistIds) {
            arr.push({artistId, songId})
        }
    }
    return schema.parse(arr)
}

interface fetchUserLikedSongIdsArgs {
    songIds: string[];
    artistId: string;
}

export async function fetchUserLikedSongIds({songIds, artistId}: fetchUserLikedSongIdsArgs) {
  const results = await createPayloadOfArtistWithSongId(songIds);
  const filteredResults = results
    .filter((result) => result.artistId === artistId)
    .map((result) => result.songId);

  return filteredResults;
}