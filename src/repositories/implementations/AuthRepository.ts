import { Request } from 'express'
import { CacheService } from 'lib-bets'
import { User } from '@entities/User'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { LoginReturn } from '@shared/interfaces/LoginReturn'

class AuthRepository {
  constructor (
    private cacheService: CacheService
  ) {}

  async doLogin (login: User, password: string, ip: string, cacheKey: string): Promise<LoginReturn> {
    // const hash = bcrypt.hashSync(password, login.password)
    // console.log(hash)
    // if (hash === login.password) {
    if (password === login.password) {
      const user = login
      const accessToken = jwt.sign(
        { login: user.public_id },
        process.env.ENV_TOKEN,
        { expiresIn: 86400 }
      )

      login.password = 'undefined'

      const body = {
        message: `${login.email} has been authenticated`,
        accessToken,
        user: user.name,
        id: user.public_id,
        ip: ip
      }

      await this.cacheService.setCache(cacheKey, body, 30)
      return body
    }
  }
}

export { AuthRepository }
