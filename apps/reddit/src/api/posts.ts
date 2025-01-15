import express from "express"
import { z } from "zod"
import { getAxiosClient } from "../axios"

const SortBySchema = z.enum(["hot", "rising", "top", "new"])

const router = express.Router()

router.get("/:channel", async (req, res, next) => {
  try {
    const sortBy = SortBySchema.safeParse(req.query.sortBy)
    const data = await getPostsOfChannel(req.params.channel, sortBy.data)

    res.json({
      message: data
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
})

export default router

async function getPostsOfChannel(channel: string, sortBy?: z.infer<typeof SortBySchema>) {
  const axiosManager = await getAxiosClient()
  const response = await axiosManager.get(`/r/${channel}/${sortBy ? sortBy : ""}`)
  return response.data
}
