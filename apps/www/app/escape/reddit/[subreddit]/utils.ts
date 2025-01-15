import prettyMilliseconds from "pretty-ms"

export function createRedditPostPayload(post) {
  return {
    label: post?.subreddit_name_prefixed,
    title: post?.title,
    description: post?.selftext,
    days: prettyMilliseconds(Date.now() - post.created * 1000, { compact: true }),
    commentsCount: post?.num_comments,
    author: post?.author,
    permalink: post?.permalink
  }
}
