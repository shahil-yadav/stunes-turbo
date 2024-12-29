"use client";

import parse from "html-react-parser";
import { Music } from "lucide-react";
import Link from "next/link";
import { FavouriteIconSyncedWithRedux } from "@/components/music-players/secondary-music-player";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addSongsInThePlaylist } from "@/lib/redux/controls-slice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { prettySeconds } from "@/lib/utils";
import { ZodSongReduxPlaylistSchema } from "@/components/recommendations/fetch-recommendations";
import { z } from "zod";

export type SongReduxPlaylistSchema = z.infer<
  typeof ZodSongReduxPlaylistSchema
>;

interface SongCardUiSchema {
  label: string;
  duration: number;
  songImageUrl?: string;
  artistsImages: { src?: string; alt: string; id: string }[];
}

type ListSongCardProps = SongReduxPlaylistSchema & SongCardUiSchema;

export function ListSongCard(props: ListSongCardProps) {
  const dispatch = useAppDispatch();
  function dispatchAddSongInThePlaylist() {
    dispatch(addSongsInThePlaylist([{ url: props.url, songId: props.songId }]));
  }

  return (
    <div className="flex min-w-64 items-center gap-3 border-b-2 border-dotted px-2 py-2">
      <button onClick={dispatchAddSongInThePlaylist}>
        <div className="flex size-20 items-center justify-center">
          {props.songImageUrl ? (
            <img className="size-20 object-cover" src={props.songImageUrl} />
          ) : (
            <Music />
          )}
        </div>
      </button>
      <div className="grow cursor-pointer space-y-4">
        <div>
          <button onClick={dispatchAddSongInThePlaylist}>
            <p className="text-left">{parse(props.label)}</p>
          </button>
        </div>
        <div className="flex items-end gap-5 text-gray-500">
          <span>{prettySeconds(props.duration)}</span>
          <div className="flex gap-1">
            {props.artistsImages.map((artistBanner, _) => (
              <Link
                key={artistBanner.id}
                href={`/artist?id=${artistBanner.id}`}
              >
                <Avatar key={_} className="size-8 uppercase">
                  <AvatarImage src={artistBanner.src} alt={artistBanner.alt} />
                  <AvatarFallback>
                    {artistBanner.alt.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <FavouriteIconSyncedWithRedux songId={props.songId} />
      </div>
    </div>
  );
}
