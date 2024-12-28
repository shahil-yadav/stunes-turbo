import { beforeAll, describe, expect, it } from 'vitest'
import { GetTrendingSectionUseCase } from '#modules/homepage/use-cases/get-trending-section.use-case'
import { HomepageModel } from '#modules/homepage/models/homepage-model'

describe('homepage use-cases test', () => {
  let getTrendingSectionUseCase: GetTrendingSectionUseCase

  beforeAll(() => {
    getTrendingSectionUseCase = new GetTrendingSectionUseCase()
  })

  it('retrieve data of homepage ', async () => {
    const data = await getTrendingSectionUseCase.execute()
    expect(() => HomepageModel.parse(data)).not.toThrow()
  })
})
