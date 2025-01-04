"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import React from "react"
import { CreateProfileForm } from "@/app/home/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Add12Regular, Edit12Regular, Person20Regular } from "@fluentui/react-icons"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectNameFromProfile, selectUrlFromProfile } from "@/lib/redux/profile-slice"

export function Info() {
  const profileUrl = useAppSelector(selectUrlFromProfile)
  const name = useAppSelector(selectNameFromProfile)

  if (!profileUrl || !name)
    return (
      <div className="flex items-center my-2 justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="shrink-0">
            <AvatarFallback>
              <Person20Regular />
            </AvatarFallback>
          </Avatar>
          <div>
            <p>Generate your profile</p>
            <p className="text-xs text-muted-foreground">
              I&#39;ll add personalised profile section later onwards
            </p>
          </div>
        </div>
        <AvatarPencil state="Create" />
      </div>
    )

  return (
    <div className="flex items-center my-2 justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="shrink-0">
          <AvatarImage
            src={profileUrl}
            alt={name}
          />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p>Hi {name},</p>
        </div>
      </div>
    </div>
  )
}

const AvatarPencil = (props: { state: "Create" | "Edit" }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="shrink-0"
          size="icon"
          variant="outline"
        >
          {props.state === "Create" && <Add12Regular />}
          {props.state === "Edit" && <Edit12Regular />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.state} profile</DialogTitle>
          <DialogDescription>Please enter the details</DialogDescription>
        </DialogHeader>
        <CreateProfileForm />
      </DialogContent>
    </Dialog>
  )
}
