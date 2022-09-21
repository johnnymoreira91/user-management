import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { ListUserController } from './ListUserController'
import { ListUserUseCase } from './ListUserUseCase'
import { CacheService } from 'lib-bets'

const usersRepository = new UsersRepository()

const listUserUseCase = new ListUserUseCase(
  usersRepository
)

const cacheService = new CacheService()

const listUserController = new ListUserController(
  listUserUseCase,
  cacheService
)

export {
  listUserController,
  listUserUseCase
}
