import express from "express"
import { axiosManager } from "./auth"

const endpoint = "/api/v1/me"

const router = express.Router()

// FIXME : Add a middleware-validator
router.get<{}>("/", async (req, res, next) => {
  try {
    const profile = await getDetailAboutMe()
    res.json(profile)
  } catch (error) {
    next(error)
  }
})

async function getDetailAboutMe() {
  if (axiosManager === null)
    throw new Error("Please visit the /auth endpoint, you are not signed in with Reddit")

  const response = await axiosManager.get(endpoint)
  return response.data
}

export default router
