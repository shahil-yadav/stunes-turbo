import useSWRImmutable from "swr/immutable";

import { SingleHorizontalCardSchema } from "@/components/horizontal-cards/ui-cards";
import { ImageQualityEnum } from "@/lib/types/enum";

export const customFetcherSWR = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to perform SWR fetch call in the client browser");
  }
  const { data } = await response.json();
  return data;
};

export function useGetDetailsOfSongForLibrarySection(songId: string) {
  const { data, ...swr } = useSWRImmutable(
    `api/songs?songId=${songId}`,
    customFetcherSWR,
  );
  // FIXME Deliberate failing
  // const { data, ...swr } = useSWR(`${BASE_URL}/song/${songId}`, customFetcherSWR)
  const song = data?.at(0);
  const formattedData = {
    imgSrc: song?.image?.at(ImageQualityEnum["150x150"])?.url,
    imgAlt: song?.name,
    title: song?.name,
    id: song?.id,
    type: song?.type,
    year: song?.year,
    duration: song?.duration,
  };
  const parsedResults = SingleHorizontalCardSchema.safeParse(formattedData);
  if (parsedResults.success) {
    return { data: parsedResults.data, ...swr };
  } else {
    return { ...swr, data: null, error: parsedResults.error.toString() };
  }
}
