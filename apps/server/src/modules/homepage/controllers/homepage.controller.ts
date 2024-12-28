import type { Routes } from '#common/types'
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { HomepageService } from '#modules/homepage/services'
import { HomepageModel } from '#modules/homepage/models/homepage-model'

export class HomepageController implements Routes {
  public controller: OpenAPIHono
  private homepageService: HomepageService

  constructor() {
    this.controller = new OpenAPIHono()
    this.homepageService = new HomepageService()
  }

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/homepage',
        tags: ['Homepage'],
        summary: 'Retrieve trending songs, playlist, albums',
        responses: {
          200: {
            description: 'Successful response with trending page details',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean().openapi({
                    description: 'Indicates the success status of the request.',
                    type: 'boolean',
                    example: true
                  }),
                  data: HomepageModel.openapi({
                    title: 'Playlist Details',
                    description: 'The detailed information of the playlist.'
                  })
                })
              }
            }
          },
          500: { description: '' }
        }
      }),
      async (ctx) => {
        try {
          const data = await this.homepageService.getTrendingSection()
          return ctx.json({ success: true, data })
        } catch {
          return ctx.json({ success: false, message: 'Internal server error' }, 500)
        }
      }
    )
  }
}
