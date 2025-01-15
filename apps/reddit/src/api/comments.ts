import express from "express"
import { getAxiosClient } from "../axios"
import { z } from "zod"

/** https://oauth.reddit.com/r/MusicRecommendations/comments/1hunhle/the_most_seductive_songs_you_know.json */
const router = express.Router()

router.get("/", async (req, res, next) => {
  const permalink = z.string().parse(req.query.permalink)
  try {
    const data = await getCommentsOfAnArticle({ permalink })
    res.json({
      message: data
    })
  } catch (error) {
    next(error)
  }
})

export default router

//  [/r/subreddit]/comments/[article]
async function getCommentsOfAnArticle({ permalink }: { permalink: string }) {
  const axiosManager = await getAxiosClient()
  const response = await axiosManager.get(`${permalink}.json`)
  return response.data
}
