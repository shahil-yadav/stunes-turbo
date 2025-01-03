"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectUrlFromProfile } from "@/lib/redux/profile-slice"

export function Info() {
  const url = useAppSelector(selectUrlFromProfile)
  return (
    <Avatar>
      <AvatarImage
        src={url}
        alt="profile-picture"
      />
      <AvatarFallback>👩</AvatarFallback>
    </Avatar>
  )
}
