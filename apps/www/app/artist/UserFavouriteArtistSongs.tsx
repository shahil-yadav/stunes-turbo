"use client"

import { useAppSelector } from "@/lib/redux/hooks"
import { selectHistorySongIds } from "@/lib/redux/controls-slice"
import useSWRImmutable from "swr/immutable"
import { LibrarySong } from "@/app/library/library-song"
import { z } from "zod"
import React from "react"

export function RecommendedArtistSongsBaseOnClientHistory({ artistId }: { artistId: string }) {
  const songIds = useAppSelector(selectHistorySongIds)
  const [isDisplayLabel, setIsDisplayLabel] = React.useState<boolean>(false)
  return (
    <div className="my-5">
      {isDisplayLabel && <p className="text-3xl">Yours top &apos;s favourites listened</p>}
      {songIds.map((songId) => (
        <Recommendations
          key={songId}
          songId={songId}
          artistId={artistId}
          setIsDisplayLabel={setIsDisplayLabel}
        />
      ))}
    </div>
  )
}

function Recommendations({
  songId,
  artistId,
  setIsDisplayLabel
}: {
  songId: string
  artistId: string
  setIsDisplayLabel: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const swr = useSWRImmutable(`/api/songs?songId=${songId}`)
  const [isDisplay, setIsDisplay] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (swr.isLoading || swr.error) return
    const data = swr.data ?? []
    const artistIds = data?.at(0).artists?.all?.map((artist) => artist?.id)
    const parsedResults = z.string().array().safeParse(artistIds)
    if (parsedResults.success && parsedResults.data.includes(artistId)) {
      setIsDisplay(true)
      setIsDisplayLabel(true)
    }
  }, [swr.data, swr.isLoading, swr.error, artistId])

  return isDisplay && <LibrarySong songId={songId} />
}
