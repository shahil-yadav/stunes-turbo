import {z} from "zod";

export async function getArtistIdFromTheSongId(songId:string) {
    const response = await fetch(`/api/songs?songId=${songId}`);
    if(!response.ok)
        throw new Error(`${response.statusText} ${response.status}`);
    const { data } = await response.json();
    const artistIds = data?.at(0).artists?.all?.map((artist) => artist?.id)
    return z.string().array().parse(artistIds)
}

async function createFilteredPayloadOfArtistWithSongId(songsIds:string[], artistId:string) {
    const schema = z.string().array();
    const arr:  z.infer<typeof schema> = []
    for (const songId of songsIds) {
        const songArtistIdsSet = new Set(await getArtistIdFromTheSongId(songId))
        if (songArtistIdsSet.has(artistId)) {
            arr.push(songId)
        }
    }
    return schema.parse(arr)
}

interface fetchUserLikedSongIdsArgs {
    songIds: string[];
    artistId: string;
}

export async function fetchUserLikedSongIds({songIds, artistId}: fetchUserLikedSongIdsArgs) {
  const results = await createFilteredPayloadOfArtistWithSongId(songIds, artistId);
  return results;
}