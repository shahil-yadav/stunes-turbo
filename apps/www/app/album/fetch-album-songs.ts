import { z } from "zod";

import { createSongsPayload } from "@/app/playlist/data/fetch-playlist-songs";
import { createAlbumPayload } from "@/app/song/data/fetch-songs";
import { BASE_URL } from "@/lib/constants";

export const SongsZodSchema = z
  .object({
    url: z.string(),
    label: z.string(),
    songId: z.string(),
    artistNames: z.string(),
    duration: z.number(),
    songImageUrl: z.string().optional(),
    artistsImages: z
      .object({ src: z.string().optional(), alt: z.string(), id: z.string() })
      .array(),
  })
  .array();

export const ZodSchema = z.object({
  album: z.object({
    imageSrc: z.string(),
    name: z.string(),
    desc: z.string(),
  }),
  songs: SongsZodSchema,
});

export async function fetchAlbumSongs(id: string) {
  const response = await fetch(`${BASE_URL}/albums?id=${id}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch album=[${id}] songs, HTTP-STATUS-CODE ${response.status}`,
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
