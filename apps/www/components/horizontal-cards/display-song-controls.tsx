"use client";

import _ from "lodash";
import { Play, Shuffle } from "lucide-react";
import { toast } from "sonner";

import { addSongsInThePlaylist } from "@/lib/redux/controls-slice";
import { useAppDispatch } from "@/lib/redux/hooks";

interface DisplaySongControlsProps {
  url: string;
  songId: string;
}

export function DisplaySongControls(props: {
  songs: DisplaySongControlsProps[];
}) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-around bg-amber-400 py-5">
      <button
        onClick={() => {
          toast.success(`Adding ${props.songs.length} songs in the playlist`);
          dispatch(addSongsInThePlaylist(props.songs));
        }}
      >
        <Play className="fill-black" />
      </button>
      <div className="border border-dotted border-black" />
      <button
        onClick={() => {
          toast.success(
            `Shuffling ${props.songs.length} songs in the playlist`,
          );
          dispatch(addSongsInThePlaylist(_.shuffle(props.songs)));
        }}
      >
        <Shuffle />
      </button>
    </div>
  );
}
