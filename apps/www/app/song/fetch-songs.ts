import { ZodSchema } from "@/app/album/fetch-album-songs";
import { createSongsPayload } from "@/app/playlist/fetch-playlist-songs";
import { BASE_URL } from "@/lib/constants";
import { ImageQualityEnum } from "@/lib/types/enum";

export function createAlbumPayload(data) {
  return {
    imageSrc: data?.image?.at(ImageQualityEnum["500x500"])?.url,
    name: data?.name,
    desc: data?.description,
  };
}

export async function fetchSongs(id: string) {
  const response = await fetch(`${BASE_URL}/songs/${id}`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch song=[${id}], HTTP-STATUS-CODE ${response.status}`,
    );
  }
  const { data: songsData } = await response.json();
  const albumId = songsData[0].album.id;
  if (!albumId) throw new Error("Album id is undefined");

  const responseAlbums = await fetch(`${BASE_URL}/albums?id=${albumId}`);
  if (!responseAlbums.ok) {
    throw new Error(
      `Failed to fetch album=[${albumId}], HTTP-STATUS-CODE ${responseAlbums.status}`,
    );
  }
  const { data: albumsData } = await responseAlbums.json();

  const formattedData = {
    album: createAlbumPayload(albumsData),
    songs: createSongsPayload(songsData),
  };
  const parsedResults = ZodSchema.safeParse(formattedData);

  if (!parsedResults.success) {
    throw new Error(parsedResults.error.toString());
  }
  return parsedResults.data;
}
