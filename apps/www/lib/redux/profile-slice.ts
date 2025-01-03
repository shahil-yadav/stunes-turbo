import { createSlice } from "@reduxjs/toolkit"

import { InitialStateOfProfileSlice } from "@/lib/redux/persist"

enum Gender {
  MALE = "males",
  FEMALE = "females"
}

function getUrlForRetroAvatars() {
  const pfpFileNames = Array.from({ length: 20 }, (_, index) => `pfp (${index}).jpeg`)
  const randomIndex = Math.floor(Math.random() * pfpFileNames.length)
  const pfp = pfpFileNames[randomIndex]
  const gender = randomIndex % 2 ? Gender.MALE : Gender.FEMALE
  return `/${gender}/${pfp}`
}

const initialState: InitialStateOfProfileSlice = {
  url: getUrlForRetroAvatars(),
  name: "< Random Name >"
}

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  selectors: {
    selectUrlFromProfile: (state) => state.url,
    selectNameFromProfile: (state) => state.name
  }
})

export const { selectUrlFromProfile, selectNameFromProfile } = profileSlice.selectors
