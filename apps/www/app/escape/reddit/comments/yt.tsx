"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { clsx } from "clsx"
import useSWRImmutable from "swr/immutable"
import { z } from "zod"

export function Yt({ children, query }: { children: React.ReactNode; query: string }) {
  const [state, setState] = React.useState(false)

  return (
    <div className="space-y-2">
      <div>{children}</div>
      <Button
        className={clsx(state && "bg-green-500")}
        onClick={() => setState((prev) => !prev)}
      >
        {state ? "Here is your video" : "Show YT video"}
      </Button>
      {state && <RecommendationYtVideo query={query} />}
    </div>
  )
}

function RecommendationYtVideo({ query }: { query: string }) {
  const { isLoading, data: id } = useGetVideoIdOfYoutube(query)
  if (isLoading) {
    return <p className="text-green-500">Loading the recommended video by query</p>
  }

  return <iframe src={`https://www.youtube.com/embed/${id}`} />
}

function createPayloadOfYt(payload) {
  const videoId = payload?.items?.at(0)?.id?.videoId
  const parsedResults = z.string().safeParse(videoId)
  return parsedResults.data
}

function useGetVideoIdOfYoutube(query: string) {
  const swr = useSWRImmutable(`http://localhost:4325/api/v1/query?q=${query}`)
  const [state, setState] = React.useState<string>()

  React.useEffect(() => {
    const data = createPayloadOfYt(swr.data)
    if (data) setState(data)
  }, [swr.data, swr.isLoading])

  return { isLoading: swr.isLoading, data: state }
}
