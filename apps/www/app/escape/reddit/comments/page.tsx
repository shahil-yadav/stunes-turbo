import { redirect } from "next/navigation"
import {
  fetchMainPostOfComments,
  fetchRelatedCommentsToMainPost
} from "@/app/escape/reddit/comments/data"
import { Comments } from "@/app/escape/reddit/comments/comments"
import { MainPost } from "@/app/escape/reddit/comments/main-post"

type SearchParams = Promise<{ permalink: string }>

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const queryParams = await searchParams
  const permalink = queryParams.permalink
  if (!permalink) redirect("/404")

  const comments = await fetchRelatedCommentsToMainPost({ permalink })
  const mainPost = await fetchMainPostOfComments({ permalink })
  return (
    <div>
      <MainPost
        username={mainPost.author}
        createdAt={mainPost.createAt}
        title={mainPost.title}
        description={mainPost.description}
      />
      <Comments trees={comments} />
    </div>
  )
}
