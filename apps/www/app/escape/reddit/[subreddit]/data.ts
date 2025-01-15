import { createRedditPostPayload } from "@/app/escape/reddit/[subreddit]/utils"
import { RedditPostSchema, SortBySchema } from "@/app/escape/reddit/[subreddit]/definitions"
import { z } from "zod"
import { REDDIT_URL } from "@/lib/constants"

export async function fetchSubredditPosts(
  subreddit: string,
  sortBy?: z.infer<typeof SortBySchema>
) {
  try {
    const response = await fetch(`${REDDIT_URL}/posts/${subreddit}?sortBy=${sortBy}`)
    const json = await response.json()
    const post = json.message
    const formattedData = post.data.children.map((child) => createRedditPostPayload(child.data))
    return RedditPostSchema.array().parse(formattedData)
  } catch {
    throw new Error(`Error fetching subreddit posts for ${subreddit}`)
  }
}

export async function fetchSnoovatarImageOfProfile(username: string) {
  try {
    const response = await fetch(`${REDDIT_URL}/profile/${username}`)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const { message } = await response.json()

    if (username === "[deleted]") {
      console.log(message)
    }

    const data = message?.data
    let url = data?.snoovatar_img
    if (!url) url = data?.icon_img
    return z.string().parse(url)
  } catch (e) {
    console.error(e)
  }
}
