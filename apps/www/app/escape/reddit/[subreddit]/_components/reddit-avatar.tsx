import { fetchSnoovatarImageOfProfile } from "@/app/escape/reddit/[subreddit]/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RedditAvatarProps {
  username: string
}

export async function RedditAvatar(props: RedditAvatarProps) {
  const url = await fetchSnoovatarImageOfProfile(props.username)
  return (
    <Avatar className="size-7 text-xs">
      <AvatarImage
        className="object-top object-cover"
        src={url}
        alt={props.username}
      />
      <AvatarFallback>{props.username.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )
}
