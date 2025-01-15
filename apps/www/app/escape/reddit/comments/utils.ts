import prettyMilliseconds from "pretty-ms"

export function createCommentPayload(node: any) {
  return {
    text: node?.body,
    author: node?.author,
    createdAt: node?.created_utc
  }
}

export function prettifyTimeDifference(ms: number) {
  return prettyMilliseconds(Date.now() - ms, { compact: true })
}

export function createMainPostCommentPayload(post) {
  return {
    label: post?.subreddit_name_prefixed,
    title: post?.title,
    description: post?.selftext,
    createAt: post?.created,
    author: post?.author
  }
}
