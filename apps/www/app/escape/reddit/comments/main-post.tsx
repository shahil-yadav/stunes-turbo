import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { RedditAvatar } from "@/app/escape/reddit/[subreddit]/_components/reddit-avatar"
import { prettifyTimeDifference } from "@/app/escape/reddit/comments/utils"

interface MainPostProps {
  username: string
  createdAt: number
  title: string
  description: string
}

export function MainPost(props: MainPostProps) {
  return (
    <Card className="text-sm mb-5 rounded-none">
      <CardHeader className="flex-row items-center gap-3">
        <CardTitle>
          <RedditAvatar username={props.username} />
        </CardTitle>
        <CardDescription className="text-xs">
          u/{props.username} &bull; {prettifyTimeDifference(props.createdAt * 1000)}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </CardContent>

      <CardFooter className="pr-0"></CardFooter>
    </Card>
  )
}
