import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { InitialStateOfProfileSlice } from "@/lib/redux/persist"

export enum Gender {
  MALE = "male",
  FEMALE = "female"
}

function getUrlForRetroAvatars(gender?: Gender) {
  const pfpFileNames = Array.from({ length: 20 }, (_, index) => `pfp (${index}).jpeg`)
  const randomIndex = Math.floor(Math.random() * pfpFileNames.length)
  const pfp = pfpFileNames[randomIndex]
  if (!gender) gender = randomIndex % 2 ? Gender.MALE : Gender.FEMALE
  return `/${gender}/${pfp}`
}

const initialState: InitialStateOfProfileSlice = {
  profileImageUrl: undefined,
  gender: undefined,
  name: undefined
}

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    createProfile: function (state, action: PayloadAction<{ gender: Gender; name: string }>) {
      state.gender = action.payload.gender
      state.name = action.payload.name
      state.profileImageUrl = getUrlForRetroAvatars(action.payload.gender)
    }
  },
  selectors: {
    selectUrlFromProfile: (state) => state.profileImageUrl,
    selectNameFromProfile: (state) => state.name,
    selectGenderFromProfile: (state) => state.gender
  }
})

export const { selectUrlFromProfile, selectNameFromProfile, selectGenderFromProfile } =
  profileSlice.selectors
export const { createProfile } = profileSlice.actions
