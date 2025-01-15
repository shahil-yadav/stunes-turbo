import { z } from "zod"

/* Recusrive data structure */

const RedditCommentSchema = z.object({
  content: z.object({
    text: z.string(),
    author: z.string(),
    createdAt: z.number()
  })
})

export type NestedComment = z.infer<typeof RedditCommentSchema> & {
  replies: NestedComment[]
}

export const RecursiveCommentSchema: z.ZodType<NestedComment> = RedditCommentSchema.extend({
  replies: z.lazy(() => RecursiveCommentSchema.array())
})

export const CommentsMainPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  createAt: z.number()
})
