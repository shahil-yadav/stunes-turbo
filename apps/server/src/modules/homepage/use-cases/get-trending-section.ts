import type { z } from 'zod'
import type { IUseCase } from '#common/types'
import * as cheerio from 'cheerio'
import { createTrendingPayload } from '#modules/homepage/helpers/create-trending-payload'
import { HTTPException } from 'hono/http-exception'
import { HomepageModel } from '#modules/homepage/models/homepage-model'

const BASE_URL = 'https://www.jiosaavn.com'

export class GetTrendingSectionUseCase implements IUseCase<{}, z.infer<typeof HomepageModel>> {
  constructor() {}

  async execute() {
    // Act as polyfill
    const window = { __INITIAL_DATA__: { homeView: { modules: [] } } }
    const response = await fetch(BASE_URL)
    const html = await response.text()

    const $ = cheerio.load(html)
    $('script').each((index, element) => {
      const scriptText = $(element).html()

      // Check if the script text contains window.__INITIAL_DATA__
      if (scriptText && scriptText.includes('window.__INITIAL_DATA__')) {
        // FIXME Deliberately Failing
        eval(scriptText)
      }
    })

    const data = createTrendingPayload(window.__INITIAL_DATA__.homeView.modules)
    const parsedResults = HomepageModel.nonempty().safeParse(data)

    if (parsedResults.success) {
      return parsedResults.data
    } else {
      throw new HTTPException(500, {
        message:
          'could not get the browser window variable to be polyfilled, try different approach other than scraping html'
      })
    }
  }
}
