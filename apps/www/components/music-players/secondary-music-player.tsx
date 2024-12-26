"use client";

import parse from "html-react-parser";
import { Heart, Pause, Play } from "lucide-react";
import { JSX } from "react";

import { useGetActiveSongDetails } from "@/components/music-players/hooks";
import {
  addSongInTheFavourites,
  removeSongFromTheFavourites,
  selectActiveSong,
  selectActiveSongIndex,
  selectFavouriteSongIds,
  selectIsActiveSongCurrentlyPlaying,
  useGetSongsProgressInPercentage,
  useTogglePlayPauseOfActiveSong,
} from "@/lib/redux/controls-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

function SecondaryMusicPlayer(props: {
  setOpenDrawer: (open: boolean) => void;
}) {
  const activeSongIndex = useAppSelector(selectActiveSongIndex);
  const isMusicPlayerCanBeActivated = activeSongIndex !== -1;

  if (!isMusicPlayerCanBeActivated) {
    return <InactiveSecondaryMusicPlayer />;
  } else {
    return <ActiveSecondaryMusicPlayer setOpenDrawer={props.setOpenDrawer} />;
  }
}

function InactiveSecondaryMusicPlayer() {
  return (
    <div>
      <div className="flex items-center justify-between bg-neutral-700 px-2 py-3 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <button>
            <Play className="mx-2 shrink-0 fill-white stroke-white" />
          </button>
          <div className="flex min-w-0 flex-col">
            <p className="font-bold">For educational purpose only!</p>
            <p className="truncate text-sm">Created with ❤️ by Shahil Yadav</p>
          </div>
        </div>
        <div className="ml-3 flex gap-5">
          <Heart />
        </div>
      </div>
      <OrangeProgressBar progressPercentage={0} />
    </div>
  );
}

function ActiveSecondaryMusicPlayer(props: {
  setOpenDrawer: (open: boolean) => void;
}) {
  const activeSongDetails = useGetActiveSongDetails();
  const progressPercentageOfActiveSong = useGetSongsProgressInPercentage();
  const togglePlayPauseOfActiveSong = useTogglePlayPauseOfActiveSong();
  const isActiveSongCurrentlyPlaying = useAppSelector(
    selectIsActiveSongCurrentlyPlaying,
  );
  const activeSong = useAppSelector(selectActiveSong);

  if (!activeSong) return null;

  return (
    <div>
      <div className="flex items-center bg-neutral-700 px-2 py-3 text-white">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button onClick={togglePlayPauseOfActiveSong}>
            {!isActiveSongCurrentlyPlaying ? (
              <Play className="mx-2 shrink-0 fill-white stroke-white" />
            ) : (
              <Pause className="mx-2 shrink-0 fill-white" />
            )}
          </button>
          <div
            onClick={() => props.setOpenDrawer(true)}
            className="flex min-w-0 flex-1 flex-col"
          >
            <DisplayMusicInformation
              data={activeSongDetails.data}
              isLoading={activeSongDetails.isLoading}
              isError={!!activeSongDetails.error}
            />
          </div>
        </div>

        <div className="ml-3 flex gap-5">
          {activeSong.songId && (
            <FavouriteIconSyncedWithRedux songId={activeSong.songId} />
          )}
        </div>
      </div>
      <OrangeProgressBar progressPercentage={progressPercentageOfActiveSong} />
    </div>
  );
}

interface DisplayMusicInformationProps {
  isLoading: boolean;
  isError: boolean;
  data: null | { name: string; artistNames: string };
}

function DisplayMusicInformation(props: DisplayMusicInformationProps) {
  function Information(props: {
    title: string | JSX.Element | JSX.Element[];
    subtitle: string;
  }) {
    return (
      <>
        <p className="truncate font-bold">{props.title}</p>
        <p className="truncate text-sm">{props.subtitle}</p>
      </>
    );
  }

  if (props.isLoading) {
    return (
      <Information title="Getting music information..." subtitle="Loading" />
    );
  }

  if (props.isError)
    return (
      <Information
        title="Error getting music information"
        subtitle="Retrying again..."
      />
    );

  return (
    props.data !== null && (
      <Information
        title={parse(props.data.name)}
        subtitle={props.data.artistNames}
      />
    )
  );
}

export function FavouriteIconSyncedWithRedux(props: { songId: string }) {
  const favouriteIds = useAppSelector(selectFavouriteSongIds);
  const dispatch = useAppDispatch();

  if (favouriteIds.includes(props.songId)) {
    return (
      <button
        onClick={() =>
          dispatch(removeSongFromTheFavourites({ songId: props.songId }))
        }
      >
        <Heart className="fill-red-500 stroke-red-500" />
      </button>
    );
  }

  return (
    <button
      onClick={() => dispatch(addSongInTheFavourites({ songId: props.songId }))}
    >
      <Heart />
    </button>
  );
}

function OrangeProgressBar(props: { progressPercentage: number }) {
  return (
    <div
      style={{ width: `${props.progressPercentage}%` }}
      className="h-[3px] bg-orange-600"
    />
  );
}

export { SecondaryMusicPlayer };
