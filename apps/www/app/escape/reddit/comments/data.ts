import {
  CommentsMainPostSchema,
  NestedComment,
  RecursiveCommentSchema
} from "@/app/escape/reddit/comments/definitions"
import { LLAMA_URL, REDDIT_URL } from "@/lib/constants"
import {
  createCommentPayload,
  createMainPostCommentPayload
} from "@/app/escape/reddit/comments/utils"
import { z } from "zod"

export async function fetchRelatedCommentsToMainPost({ permalink }: { permalink: string }) {
  try {
    const response = await fetch(`${REDDIT_URL}/comments?permalink=${permalink}`)
    const { message: comments } = await response.json()
    const commentsInRegardToMainPost = comments?.at(1)?.data?.children

    return RecursiveCommentSchema.array().parse(
      createRecursiveCommentTree(commentsInRegardToMainPost)
    )
  } catch (err) {
    console.error(err)
    throw new Error("Could not load related comments")
  }

  // FIXME Very Risky
  function createRecursiveCommentTree(nodes) {
    const arr: NestedComment[] = []
    for (const node of nodes) {
      // FIXME Remove this ignorace of (+ More) attrib
      if (node.kind === "more") continue

      const customNode: NestedComment = {
        content: createCommentPayload(node?.data),
        replies: []
      }
      const children = node?.data?.replies?.data?.children ?? []
      if (children.length > 0) {
        customNode.replies = createRecursiveCommentTree(children)
      }
      arr.push(customNode)
    }
    return arr
  }
}

export async function fetchMainPostOfComments({ permalink }: { permalink: string }) {
  // FIXME Simulated fetch call
  const response = await fetch(`${REDDIT_URL}/comments?permalink=${permalink}`)
  const { message: comments } = await response.json()

  const post = comments.at(0)?.data?.children?.at(0)?.data
  if (!post) throw new Error("Post is undefined")
  const formattedData = createMainPostCommentPayload(post)
  return CommentsMainPostSchema.parse(formattedData)
}

export async function getLlamaSuggestionsForSongsFromComments(text: string) {
  try {
    const response = await fetch(`${LLAMA_URL}/extract`, {
      method: "POST",
      body: JSON.stringify({ comment: text /* tree.content.text */ }),
      headers: { "Content-Type": "application/json" }
    })
    const { message } = await response.json()
    return z
      .object({
        results: z.string().array(),
        links: z.string().array()
      })
      .parse(message)
  } catch (e) {
    console.error(e)
  }
}
