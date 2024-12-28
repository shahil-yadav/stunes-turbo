import type { z } from 'zod'
import type { IUseCase } from '#common/types'
import { useFetch } from '#common/helpers'
import { Endpoints } from '#common/constants'
import { HomepageModel } from '#modules/homepage/models/homepage-model'
import { createTrendingPayload } from '#modules/homepage/helpers/create-trending-payload'
import { HTTPException } from 'hono/http-exception'

export class GetTrendingSectionUseCase implements IUseCase<{}, z.infer<typeof HomepageModel>> {
  constructor() {}

  async execute() {
    const { data } = await useFetch({
      endpoint: Endpoints.trending,
      params: {}
    })

    const formattedData = createTrendingPayload(data)
    const parsedResults = HomepageModel.safeParse(formattedData)
    if (!parsedResults.success) throw new HTTPException(500, { message: parsedResults.error.toString() })

    return parsedResults.data
  }
}
