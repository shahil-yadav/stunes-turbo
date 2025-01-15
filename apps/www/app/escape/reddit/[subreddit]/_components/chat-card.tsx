import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { RedditAvatar } from "@/app/escape/reddit/[subreddit]/_components/reddit-avatar"
import parse from "html-react-parser"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { SelectionActionsBar } from "@/app/escape/reddit/comments/selection"

interface ChatCardProps {
  permalink: string
  username: string
  title: string
  description: string
  commentsCount: number
  days: string
}

export async function ChatCard(props: ChatCardProps) {
  return (
    <Card className="text-sm rounded-none">
      <CardHeader className="flex-row items-center gap-3">
        <CardTitle>
          <RedditAvatar username={props.username} />
        </CardTitle>
        <CardDescription className="text-xs">
          {`u/${props.username}`} &bull; {props.days}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipPrimitive.Provider>
          <SelectionActionsBar>
            <div>
              <p className="font-semibold mb-2 text-base">{parse(props.title)}</p>
              <p>{parse(props.description)}</p>
            </div>
          </SelectionActionsBar>
        </TooltipPrimitive.Provider>
      </CardContent>
      <CardFooter>
        <Link href={`/escape/reddit/comments?permalink=${props.permalink}`}>
          <div className="flex gap-1 items-center">
            <MessageCircle className="size-5" />
            <span>{props.commentsCount}</span>
          </div>
        </Link>
      </CardFooter>
    </Card>
  )
}
