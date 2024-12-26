import { SongsZodSchema } from "@/app/album/fetch-album-songs";
import { createSongsPayload } from "@/app/playlist/data/fetch-playlist-songs";
import { BASE_URL } from "@/lib/constants";

export async function fetchSongsByQuery(query: string) {
  const response = await fetch(`${BASE_URL}/search/songs?query=${query}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch songs by search query of ${query}, ${response.statusText}`,
    );
  }

  const { data } = await response.json();
  const formattedData = createSongsPayload(data?.results);

  const parsedResults = SongsZodSchema.safeParse(formattedData);
  if (!parsedResults.success) throw new Error(parsedResults.error.toString());

  return parsedResults.data;
}
