import { SwrRestApiError, ZodParsingError } from "@/lib/utils/custom-error"
import { z } from "zod"

export async function globalSwrConfigFetcher(resource, init) {
  console.log("globalSwrConfigFetcher was called")
  const response = await fetch(resource, init)
  if (!response.ok) throw new SwrRestApiError()
  const json = await response.json()

  const schema = z.object({ data: z.any() })
  const { data: parsedData, success, error } = schema.safeParse(json)
  if (!success) {
    console.error(error.format())
    throw new ZodParsingError()
  }
  return parsedData.data
}
