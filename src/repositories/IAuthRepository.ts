import { User } from '@entities/User'
import { Request } from 'express'
import { LoginReturn } from '@shared/interfaces/LoginReturn'

export interface IAuthRepository {
  doLogin(login: User, password: string, ip: string, cacheKey: string): Promise<LoginReturn>;
}
