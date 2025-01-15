import express from "express"
import { getAxiosClient } from "../axios"

const router = express.Router()

router.get("/:username", async (req, res, next) => {
  try {
    const profile = await getProfileDetails(req.params.username)
    res.json({
      message: profile
    })
  } catch (e) {
    next(e)
  }
})

export default router

async function getProfileDetails(username: string) {
  const axiosManager = await getAxiosClient()
  const response = await axiosManager.get(`/user/${username}/about`)
  return response.data
}
