import { z } from 'zod'

export const HomepageModel = z
  .object({
    title: z.string(),
    data: z
      .object({
        type: z.string(),
        id: z.string(),
        title: z.string(),
        image: z.string()
      })
      .array()
  })
  .array()
