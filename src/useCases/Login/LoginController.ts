import { Request, Response } from 'express'
import { CacheService } from 'lib-bets'
import { LoginUseCase } from './LoginUseCase'

class LoginController {
  constructor (
    private cacheService: CacheService,
    private loginUseCase: LoginUseCase
  ) {}

  async handle (req: Request<{}, {}, { email: string, password: string }>, res: Response) {
    const { email, password } = req.body
    const cacheKey = `${email}+${password}`

    try {
      const dataCache = await this.cacheService.getCache(cacheKey)
      if (!dataCache) {
        const data = await this.loginUseCase.execute({
          email,
          password,
          ip: req.socket.remoteAddress ?? 'Ip not found!',
          cacheKey,
          res
        })
        return res.status(200).json(data)
      }
      return res.status(200).json(dataCache)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { LoginController }
