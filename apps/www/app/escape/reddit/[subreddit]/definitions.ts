import { z } from "zod"

export const RedditPostSchema = z.object({
  permalink: z.string(),
  label: z.string(),
  title: z.string(),
  description: z.string(),
  days: z.string(),
  commentsCount: z.number(),
  author: z.string()
})

export const SortBySchema = z.enum(["hot", "rising", "top", "new"])
