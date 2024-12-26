import { ZodSchema } from "@/app/album/fetch-album-songs";
import { createAlbumPayload } from "@/app/song/data/fetch-songs";
import { BASE_URL } from "@/lib/constants";
import { ImageQualityEnum, SongQualityInKkbps } from "@/lib/types/enum";

export function createSongsPayload(songs) {
  return songs?.map((song) => ({
    url: song?.downloadUrl?.at(SongQualityInKkbps["320kbps"])?.url,
    label: song?.name,
    songId: song?.id,
    artistNames: song?.artists?.primary
      ?.map((artist) => artist?.name)
      .join(", "),
    duration: song?.duration,
    songImageUrl: song?.image[ImageQualityEnum["500x500"]]?.url,
    artistsImages: song?.artists?.primary?.slice(0, 3)?.map((artist) => ({
      src: artist?.image?.[0]?.url,
      alt: artist?.name,
      id: artist?.id,
    })),
  }));
}

export async function fetchPlaylistSongs(id: string) {
  const response = await fetch(`${BASE_URL}/playlists?id=${id}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch playlists=[${id}] songs, HTTP-STATUS-CODE ${response.status}`,
    );
  }

  const { data } = await response.json();

  const formattedData = {
    album: createAlbumPayload(data),
    songs: createSongsPayload(data?.songs),
  };

  const parsedResults = ZodSchema.safeParse(formattedData);
  if (!parsedResults.success) {
    throw new Error(parsedResults.error.toString());
  }

  return parsedResults.data;
}
