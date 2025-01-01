import useSWR from "swr";
import { z } from "zod";

import { customFetcherSWR } from "@/app/library/use-get-details-of-song";
import { selectActiveSong } from "@/lib/redux/controls-slice";
import { useAppSelector } from "@/lib/redux/hooks";
import { ImageQualityEnum } from "@/lib/types/enum";
import useSWRImmutable from "swr/immutable";

const schema = z.object({
  name: z.string(),
  artistNames: z.string(),
  songImageUrl: z.string(),
});

export function useGetActiveSongDetails() {
  const activeSong = useAppSelector(selectActiveSong);
  const songId = activeSong?.songId ?? "";
  const { data, ...swr } = useSWRImmutable(`/api/songs?songId=${songId}`);
  // FIXME Deliberately Failing
  // const { data, ...swr } = useSWR(`api/song?songId=${songId}`, customFetcherSWR)
  const song = data?.at(0);
  const formattedData = {
    name: song?.name,
    artistNames: song?.artists?.primary
      ?.map((artist) => artist?.name)
      .join(", "),
    songImageUrl: song?.image?.at(ImageQualityEnum["500x500"])?.url,
  };
  const parsedResults = schema.safeParse(formattedData);
  if (parsedResults.success) return { data: parsedResults.data, ...swr };
  else return { data: null, ...swr };
}
