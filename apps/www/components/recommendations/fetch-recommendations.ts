import { z } from "zod";
import { SongQualityInKkbps } from "@/lib/types/enum";

export const ZodSongReduxPlaylistSchema = z.object({
  url: z.string(),
  songId: z.string(),
});

export async function fetchMusicRecommendationsSWR(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Cannot find music recommendations");
  }
  const { data } = await response.json();
  const formattedData = createRecommendationPlayload(data);

  const parsedResults =
    ZodSongReduxPlaylistSchema.array().safeParse(formattedData);

  if (!parsedResults.success) {
    throw new Error(parsedResults.error.toString());
  }

  return parsedResults.data;
}

function createRecommendationPlayload(data) {
  return data.map((song) => ({
    songId: song?.id,
    url: song?.downloadUrl?.at(SongQualityInKkbps["320kbps"])?.url,
  }));
}
