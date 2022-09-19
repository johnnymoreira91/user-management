import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { InsertMock } from '@utils/mock'
import { database } from '@infra/database/knex'
import { CreateUserUseCase } from '@useCases/CreateUser/CreateUserUseCase'

describe('CreateUserUseCase test', () => {
  let createUserUseCase: CreateUserUseCase
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    await InsertMock()
  })

  beforeAll(async () => {
    await database.schema.dropSchema
  })

  test('It Should create one user', async () => {
    const user = {
      name: 'superTest',
      email: 'superTest@test.com',
      password: 'test',
      age: 50,
      isGuest: false,
      active: true
    }

    const data = await createUserUseCase.execute(user)
    expect(data.name).toBe('superTest')
    expect(data.email).toBe('superTest@test.com')
  })
})
