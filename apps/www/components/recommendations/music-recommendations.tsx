"use client";

import useSWR from "swr";
import {
  useEnableAiMusicRecommendations,
  useGetSongIdFromReduxSongsPlaylist,
} from "@/components/recommendations/hooks";
import React from "react";
import { fetchMusicRecommendationsSWR } from "@/components/recommendations/fetch-recommendations";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addRecommendationInThePlaylist } from "@/lib/redux/controls-slice";
import { toast } from "sonner";

export function MusicRecommendations() {
  const songId = useGetSongIdFromReduxSongsPlaylist();
  return songId && <InnerMusicRecommendations songId={songId} />;
}

function InnerMusicRecommendations({ songId }: { songId: string }) {
  const swr = useSWR(`/api/ai?songId=${songId}`, fetchMusicRecommendationsSWR);
  const state = useEnableAiMusicRecommendations();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (swr.error) {
      toast.error("Cannot laod AI recommendations");
      console.error(swr.error);
    }

    if (swr.data && state) dispatch(addRecommendationInThePlaylist(swr.data));
  }, [swr.data, swr.error, state]);

  return (
    false && (
      <div className="absolute bg-gray-300 top-0 left-0">
        <p>{state && "AI MODE ENABLED"}</p>
        <ul className="list-decimal">
          {swr.data?.map((song) => (
            <li key={song.songId} className="text-[10px]">
              {song.url}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
