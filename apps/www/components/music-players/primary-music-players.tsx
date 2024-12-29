"use client";

import parse from "html-react-parser";
import {
  FastForward,
  Pause,
  Play,
  Rewind,
  Volume,
  Volume2,
} from "lucide-react";
import React from "react";

import { useGetActiveSongDetails } from "@/components/music-players/hooks";
import { Slider } from "@/components/ui/slider";
import {
  changeActiveSongTrackByStep,
  selectActiveSongSeekProgress,
  selectIsActiveSongCurrentlyPlaying,
  selectTotalSongDurationOfActiveSong,
  selectVolumeBarProgress,
  setActiveSongPlayback,
  setVolume,
  useGetSongsProgressInPercentage,
  useTogglePlayPauseOfActiveSong,
} from "@/lib/redux/controls-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { prettySeconds } from "@/lib/utils";

function useGetTimeProgressOfActiveSong() {
  const seekProgressOfActiveSong = useAppSelector(selectActiveSongSeekProgress);
  const totalSongDurationOfActiveSong = useAppSelector(
    selectTotalSongDurationOfActiveSong,
  );
  return { seekProgressOfActiveSong, totalSongDurationOfActiveSong };
}

function TimeSeekingSlider() {
  const dispatch = useAppDispatch();
  const progressPercentageOfActiveSong = useGetSongsProgressInPercentage();

  function handleSeekingOfSlider(arg: number[]) {
    const [value] = arg;
    value && dispatch(setActiveSongPlayback({ seekPercentage: value }));
  }

  return (
    <Slider
      onValueChange={handleSeekingOfSlider}
      value={[progressPercentageOfActiveSong]}
      max={100}
      step={1}
    />
  );
}

export function PrimaryMusicPlayer() {
  const activeSongDetails = useGetActiveSongDetails();
  const togglePlayPauseOfActiveSong = useTogglePlayPauseOfActiveSong();
  const isActiveSongCurrentlyPlaying = useAppSelector(
    selectIsActiveSongCurrentlyPlaying,
  );
  const { seekProgressOfActiveSong, totalSongDurationOfActiveSong } =
    useGetTimeProgressOfActiveSong();

  const dispatch = useAppDispatch();
  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex justify-center">
        {activeSongDetails?.data?.songImageUrl ? (
          <img
            className="h-[30svh] object-cover"
            src={activeSongDetails.data.songImageUrl}
          />
        ) : (
          <div className="h-[30svh]" />
        )}
      </div>
      <div className="space-y-5">
        <div>
          {activeSongDetails?.error ? (
            activeSongDetails?.error?.toString()
          ) : (
            <>
              <p className="text-lg truncate font-semibold">
                {activeSongDetails?.data?.name
                  ? parse(activeSongDetails.data.name)
                  : "---"}
              </p>
              <p className="text-xs truncate font-semibold">
                {activeSongDetails?.data?.artistNames ?? "-----"}
              </p>
            </>
          )}
        </div>
        <div>
          <TimeSeekingSlider />
          <div className="flex justify-between text-gray-500">
            <span>
              {prettySeconds(seekProgressOfActiveSong, true) ?? "--:--"}
            </span>
            <span>
              {prettySeconds(totalSongDurationOfActiveSong, true) ?? "--:--"}
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-14">
          <button onClick={() => dispatch(changeActiveSongTrackByStep(-1))}>
            <Rewind size={38} className="fill-black" />
          </button>

          <button onClick={togglePlayPauseOfActiveSong}>
            {!isActiveSongCurrentlyPlaying ? (
              <Play size={38} className="fill-black" />
            ) : (
              <Pause size={38} className="fill-black" />
            )}
          </button>
          <button onClick={() => dispatch(changeActiveSongTrackByStep(1))}>
            <FastForward className="fill-black" size={38} />
          </button>
        </div>

        <div className="flex text-gray-500">
          <VolumeSeekingSlider />
        </div>
      </div>
      <div></div>
    </div>
  );
}

function VolumeSeekingSlider() {
  const volumeBarProgressOfActiveSong = useAppSelector(selectVolumeBarProgress);
  const dispatch = useAppDispatch();

  function handleSeekingOfSlider([value]: number[]) {
    value && dispatch(setVolume(value));
  }

  return (
    <>
      <Volume />
      <Slider
        onValueChange={handleSeekingOfSlider}
        className="mx-5"
        value={[volumeBarProgressOfActiveSong]}
        max={1}
        step={0.01}
      />
      <Volume2 />
    </>
  );
}
