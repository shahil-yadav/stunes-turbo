"use client"

import Link from "next/link"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="w-full">
      <p>F*** ☠️</p>
      <img
        width={500}
        height={250}
        src={"/error.webp"}
        alt="error"
      />
      <p className="text-wrap text-red-600">Try retrying again maybe :(</p>
      <p>{error.message}</p>
      <div className="mt-4 space-x-2">
        <Button
          variant="destructive"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
        <Link href="/">Redirect to Homescreen</Link>
      </div>
    </div>
  )
}
