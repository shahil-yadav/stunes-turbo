import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit"
import { controlsSlice } from "@/lib/redux/controls-slice"
import { persistReducer } from "redux-persist"
import { Gender, profileSlice } from "@/lib/redux/profile-slice"
import { SongReduxPlaylistSchema } from "@/components/horizontal-cards/list-song-card"

export interface InitialStateOfControlSlice {
  history: string[]
  favourites: string[]
  playlist: { songs: SongReduxPlaylistSchema[]; activeSongIndex: number }
  volume: number
  activeSongStates: {
    isReady: boolean
    isPlaying: boolean
    isSeeking: boolean
    progressIndicator: {
      bufferedDuration: number
      totalSongDuration: number
      seekProgress: number
    }
  }
}

export interface InitialStateOfProfileSlice {
  profileImageUrl?: string
  gender?: Gender
  name?: string
}

const controlsPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["history", "favourites", "volume"]
}

const profilePersistConfig = {
  key: "profile",
  storage: storage
}

export const rootReducer = combineReducers({
  [controlsSlice.reducerPath]: persistReducer(controlsPersistConfig, controlsSlice.reducer),
  [profileSlice.reducerPath]: persistReducer(profilePersistConfig, profileSlice.reducer)
})

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// export const rootSliceReducer = combineSlices(controlsSlice)
// const rootReducer = persistReducer(persistConfig, rootSliceReducer)
// export { rootReducer }
