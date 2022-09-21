import { Request, Response } from 'express'
import { ListUserUseCase } from './ListUserUseCase'
import { CacheService } from 'lib-bets'
import * as cacheConfig from '../../infra/config/cacheConfig.json'

class ListUserController {
  constructor (
    private listUserUseCase: ListUserUseCase,
    private cacheService: CacheService
  ) {}

  async handle (_req: Request<{}, {}, {}>, res: Response): Promise<Response> {
    const cacheKey = cacheConfig.listUsersKey
    try {
      const cache = await this.cacheService.getCache(cacheKey)
      if (!cache) {
        const data = await this.listUserUseCase.execute()
        await this.cacheService.setCache(cacheKey, data, 30)
        return res.status(200).json(data)
      }
      return res.status(200).json(cache)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { ListUserController }
