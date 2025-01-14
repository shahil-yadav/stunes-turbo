import {
  AlbumsZodArtistPageSchema,
  createAlbumPayload,
} from "@/app/artist/fetch-artist";
import { BASE_URL } from "@/lib/constants";

export async function fetchPlaylistByQuery(query: string) {
  const response = await fetch(`${BASE_URL}/search/playlists?query=${query}`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch playlists by search query of ${query}, ${response.statusText}`,
    );
  }

  const { data } = await response.json();
  const formattedData = createAlbumPayload(data?.results);
  const parsedResults = AlbumsZodArtistPageSchema.safeParse(formattedData);
  if (!parsedResults.success) throw new Error(parsedResults.error.toString());

  return parsedResults.data;
}
