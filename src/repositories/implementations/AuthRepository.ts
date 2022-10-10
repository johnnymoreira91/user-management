import { Response } from 'express'
import { CacheService } from 'lib-bets'
import { User } from '@entities/User'
import * as jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { LoginReturn } from '@shared/interfaces/LoginReturn'
import moment from 'moment'

class AuthRepository {
  constructor (
    private cacheService: CacheService
  ) {}

  async createOpacToken (user: User): Promise<string> {
    const token = crypto.randomBytes(24).toString('hex')
    const ttl = moment().add(1, 'd').unix()
    return token
  }

  async doLogin (login: User, password: string, ip: string, cacheKey: string, res: Response): Promise<LoginReturn> {
    if (password === login.password) {
      const user = login
      const accessToken = jwt.sign(
        { login: user.public_id },
        process.env.ENV_TOKEN,
        { expiresIn: 86400 }
      )
      const refreshToken = await this.createOpacToken(user)
      console.log(refreshToken, 'token rrr')

      login.password = 'undefined'

      // res.setHeader('authorization', accessToken)
      const body = {
        message: `${login.email} has been authenticated`,
        accessToken,
        user: user,
        id: user.public_id,
        ip: ip
      }

      await this.cacheService.setCache(cacheKey, body, 30)
      return body
    }
  }
}

export { AuthRepository }
