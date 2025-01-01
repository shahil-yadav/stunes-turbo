import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { controlsSlice } from "@/lib/redux/controls-slice"

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["history", "favourites", "volume"]
}

export const rootSliceReducer = combineReducers({
  [controlsSlice.reducerPath]: persistReducer(persistConfig, controlsSlice.reducer)
})

export { rootSliceReducer as rootReducer }

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.

// export const rootSliceReducer = combineSlices(controlsSlice)
// const rootReducer = persistReducer(persistConfig, rootSliceReducer)
// export { rootReducer }
