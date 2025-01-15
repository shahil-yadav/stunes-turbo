import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { NestedComment } from "@/app/escape/reddit/comments/definitions"
import Markdown from "react-markdown"
import { RedditAvatar } from "@/app/escape/reddit/[subreddit]/_components/reddit-avatar"
import { prettifyTimeDifference } from "@/app/escape/reddit/comments/utils"
import { getLlamaSuggestionsForSongsFromComments } from "@/app/escape/reddit/comments/data"
import React, { Suspense } from "react"
import Link from "next/link"
import { Yt } from "@/app/escape/reddit/comments/yt"

export function Comments({ trees }: { trees: NestedComment[] }) {
  return trees.map((tree, _) => (
    <Comment
      key={_}
      tree={tree}
    />
  ))
}

async function Comment({ tree }: { tree: NestedComment }) {
  return (
    <Card className="text-sm rounded-none">
      <CardHeader className="flex-row items-center gap-3">
        <CardTitle>
          <RedditAvatar username={tree.content.author} />
        </CardTitle>
        <CardDescription className="text-xs">
          u/{tree.content.author} &bull; {prettifyTimeDifference(tree.content.createdAt * 1000)}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Markdown>{tree.content.text}</Markdown>
        <Suspense
          fallback={
            <p>
              Loading <span className="text-orange-300">ai suggestions</span> ...
            </p>
          }
        >
          <Llama content={tree.content.text} />
        </Suspense>
      </CardContent>

      <CardFooter className="pr-0">
        <div className="w-full">
          {tree.replies.map((parent, _) => (
            <Comment
              key={_}
              tree={parent}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

async function Llama({ content }: { content: string }) {
  const labels = await getLlamaSuggestionsForSongsFromComments(content)
  return (
    <ul className="list-disc my-5 text-green-500">
      {labels && (
        <>
          <p className="text-blue-500">YT queries by phi4</p>
          {labels.results.map((song, _) => (
            <li
              className="my-10"
              key={_}
            >
              <Yt query={song}>
                <Link
                  target="_blank"
                  href={`https://www.youtube.com/results?search_query=${song}`}
                >
                  {song}
                </Link>
              </Yt>
            </li>
          ))}

          <p className="text-blue-500">YT Links by phi4</p>
          {labels.links.map((song, _) => (
            <li key={_}>{song}</li>
          ))}
        </>
      )}
    </ul>
  )
}
