import { GetTrendingSectionUseCase } from '#modules/homepage/use-cases'

export class HomepageService {
  private readonly getTrendingSectionUseCase: GetTrendingSectionUseCase

  constructor() {
    this.getTrendingSectionUseCase = new GetTrendingSectionUseCase()
  }

  getTrendingSection() {
    return this.getTrendingSectionUseCase.execute()
  }
}
