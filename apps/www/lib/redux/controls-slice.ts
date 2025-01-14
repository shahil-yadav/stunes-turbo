import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { InitialStateOfControlSlice } from "@/lib/redux/persist"

type SongReduxPlaylistSchema = { url: string; songId: string }

const initialReduxStateOfControlsSlice: InitialStateOfControlSlice = {
  history: [],
  favourites: [],
  playlist: {
    songs: [],
    activeSongIndex: -1
  },
  volume: 0.5,
  activeSongStates: {
    isReady: false,
    isPlaying: false,
    isSeeking: false,
    progressIndicator: {
      bufferedDuration: 0,
      totalSongDuration: 0,
      seekProgress: 0
    }
  }
}

export const controlsSlice = createSlice({
  name: "playerControls",
  initialState: initialReduxStateOfControlsSlice,
  reducers: {
    addRecommendationInThePlaylist: (state, action: PayloadAction<SongReduxPlaylistSchema[]>) => {
      state.playlist.songs.push(...action.payload)
    },

    addSongsInThePlaylist: (state, action: PayloadAction<SongReduxPlaylistSchema[]>) => {
      state.activeSongStates.isPlaying = false
      state.playlist.activeSongIndex = -1
      state.playlist.songs = []
      state.playlist.songs.push(...action.payload)
      state.playlist.activeSongIndex = 0
      state.activeSongStates.isReady = false
    },

    addActiveSongInTheHistory: (state) => {
      const activeSong = state.playlist.songs[state.playlist.activeSongIndex]
      if (!activeSong) throw new Error("Active song is undefined in the history reducer")
      const songId = activeSong.songId
      if (state.history.indexOf(songId) >= 0) {
        // delete state.history[state.history.indexOf(songId)]
        _.remove(state.history, function (historySongId) {
          return historySongId === songId
        })
      }
      state.history.unshift(songId)
    },

    addSongInTheFavourites: (state, action: PayloadAction<{ songId: string }>) => {
      state.favourites.unshift(action.payload.songId)
    },

    removeSongFromTheFavourites: (state, action: PayloadAction<{ songId: string }>) => {
      state.favourites = state.favourites.filter((songId) => songId !== action.payload.songId)
    },

    changeActiveSongTrackByStep: (state, action: PayloadAction<number>) => {
      const newActiveSongIndex = state.playlist.activeSongIndex + action.payload
      if (newActiveSongIndex >= 0 && newActiveSongIndex < state.playlist.songs.length) {
        state.activeSongStates.progressIndicator = {
          bufferedDuration: 0,
          seekProgress: 0,
          totalSongDuration: 0
        }
        state.activeSongStates.isPlaying = false
        state.activeSongStates.isReady = false
        state.playlist.activeSongIndex = newActiveSongIndex
      }
    },

    changeActiveSongTrack: (state, action: PayloadAction<number>) => {
      state.activeSongStates.progressIndicator = {
        bufferedDuration: 0,
        seekProgress: 0,
        totalSongDuration: 0
      }
      state.activeSongStates.isPlaying = false
      state.activeSongStates.isReady = false
      state.playlist.activeSongIndex += action.payload
    },

    setActiveSongIndex: (state, action: PayloadAction<number>) => {
      state.playlist.activeSongIndex = action.payload
    },

    setIsReady: function (state, action: PayloadAction<boolean>) {
      state.activeSongStates.isReady = action.payload
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.activeSongStates.isPlaying = action.payload
    },

    setVolume: (state, action: PayloadAction<number>) => {
      /* Volume needs to be from 0 to 1 */
      if (action.payload < 0 || action.payload > 1)
        throw new Error("Volume needs to be from 0 to 1, Kindly check the args!")
      state.volume = action.payload
    },

    setBufferedProgress: (state, action: PayloadAction<number>) => {
      state.activeSongStates.progressIndicator.bufferedDuration = action.payload
    },

    setTotalSongDuration: (state, action: PayloadAction<number>) => {
      state.activeSongStates.progressIndicator.totalSongDuration = action.payload
    },

    setSeekProgress: (state, action: PayloadAction<number>) => {
      state.activeSongStates.progressIndicator.seekProgress = action.payload
    },

    setIsSeeking: (state, action: PayloadAction<boolean>) => {
      state.activeSongStates.isSeeking = action.payload
    },

    setActiveSongPlayback: (state, action: PayloadAction<{ seekPercentage: number }>) => {
      const seekTimestamp =
        (action.payload.seekPercentage *
          state.activeSongStates.progressIndicator.totalSongDuration) /
        100
      state.activeSongStates.isSeeking = true
      state.activeSongStates.progressIndicator.seekProgress = seekTimestamp
    }
  },
  selectors: {
    selectPlaylistSongs: (state) => state.playlist.songs,
    selectActiveSongIndex: (state) => state.playlist.activeSongIndex,
    selectActiveSong: (state) => {
      const playlist = state.playlist
      return playlist.songs[playlist.activeSongIndex]
    },
    selectActiveSongStates: (state) => state.activeSongStates,
    selectVolumeBarProgress: (state) => state.volume,
    selectTotalSongDurationOfActiveSong: (state) =>
      state.activeSongStates.progressIndicator.totalSongDuration,
    selectActiveSongSeekProgress: (state) => state.activeSongStates.progressIndicator.seekProgress,
    selectIsActiveSongCurrentlyPlaying: (state) => state.activeSongStates.isPlaying,
    selectHistorySongIds: (state) => state.history,
    selectFavouriteSongIds: (state) => state.favourites
  }
})

export function useTogglePlayPauseOfActiveSong() {
  const dispatch = useAppDispatch()
  const isActiveSongCurrentlyPlaying = useAppSelector(selectIsActiveSongCurrentlyPlaying)

  function togglePlayPauseOfActiveSong() {
    if (!isActiveSongCurrentlyPlaying) dispatch(setIsPlaying(true))
    else dispatch(setIsPlaying(false))
  }

  return togglePlayPauseOfActiveSong
}

export function useGetSongsProgressInPercentage() {
  const seekProgressOfActiveSong = useAppSelector(selectActiveSongSeekProgress)
  const totalSongDurationOfActiveSong = useAppSelector(selectTotalSongDurationOfActiveSong)
  return Math.round((seekProgressOfActiveSong / totalSongDurationOfActiveSong) * 100)
}

export const {
  selectActiveSongIndex,
  selectActiveSong,
  selectVolumeBarProgress,
  selectTotalSongDurationOfActiveSong,
  selectActiveSongSeekProgress,
  selectIsActiveSongCurrentlyPlaying,
  selectHistorySongIds,
  selectFavouriteSongIds,
  selectActiveSongStates,
  selectPlaylistSongs
} = controlsSlice.selectors

export const {
  addRecommendationInThePlaylist,
  addSongsInThePlaylist,
  addActiveSongInTheHistory,
  changeActiveSongTrackByStep,
  addSongInTheFavourites,
  removeSongFromTheFavourites,
  setActiveSongIndex,
  setIsReady,
  setIsPlaying,
  setIsSeeking,
  setVolume,
  setSeekProgress,
  setActiveSongPlayback,
  setBufferedProgress,
  setTotalSongDuration
} = controlsSlice.actions
