import { z } from "zod";

import { SongsZodSchema } from "@/app/album/fetch-album-songs";
import { createSongsPayload } from "@/app/playlist/fetch-playlist-songs";
import { BASE_URL } from "@/lib/constants";
import { ImageQualityEnum } from "@/lib/types/enum";

export const AlbumsZodArtistPageSchema = z
  .object({
    id: z.string(),
    imgSrc: z.string(),
    type: z.string(),
    title: z.string(),
  })
  .array();

export const ZodSchema = z.object({
  info: z.object({
    name: z.string(),
    imgSrc: z.string(),
  }),
  songs: SongsZodSchema,
  albums: AlbumsZodArtistPageSchema,
  singles: AlbumsZodArtistPageSchema,
});

export function createAlbumPayload(albums) {
  const data = albums?.map((album) => ({
    id: album?.id,
    imgSrc: album?.image?.at(ImageQualityEnum["500x500"])?.url,
    type: album?.type,
    title: album?.name,
  }));

  return data;
}

export async function fetchArtist(artistId: string) {
  const response = await fetch(`${BASE_URL}/artists/${artistId}`, {
    // cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch artist=[${artistId}], HTTP-STATUS-CODE ${response.status}`,
    );
  }

  const { data } = await response.json();
  console.log(data);
  const formattedData = {
    info: {
      name: data?.name,
      imgSrc: data?.image?.at(ImageQualityEnum["500x500"]).url,
    },
    songs: createSongsPayload(data?.topSongs),
    albums: createAlbumPayload(data?.topAlbums),
    singles: createAlbumPayload(data?.singles),
  };

  const parsedResults = ZodSchema.safeParse(formattedData);
  if (!parsedResults.success) {
    throw new Error(parsedResults.error.toString());
  }

  return parsedResults.data;
}
