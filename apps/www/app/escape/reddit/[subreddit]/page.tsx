import { fetchSubredditPosts } from "@/app/escape/reddit/[subreddit]/data"
import { ChatCard } from "@/app/escape/reddit/[subreddit]/_components/chat-card"

// FIXME Introduce pagination also
export default async function Page({ params }: { params: Promise<{ subreddit: string }> }) {
  const searchParams = await params
  const data = await fetchSubredditPosts(searchParams.subreddit, "new")
  return (
    <div className="space-y-2">
      {data.map((post, _) => (
        <ChatCard
          permalink={post.permalink}
          key={_}
          username={post.author}
          title={post.title}
          description={post.description}
          commentsCount={post.commentsCount}
          days={post.days}
        />
      ))}
    </div>
  )
}
