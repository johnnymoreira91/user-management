import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { InsertMock } from '@utils/mock'
import { database } from '@infra/database/knex'

describe('User Repository test', () => {
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should create one user', async () => {
    const user = {
      name: 'superTest',
      email: 'superTest@test.com',
      password: 'test',
      age: 50,
      isGuest: false,
      active: true,
      public_id: 'abc-12345'
    }

    const data = await userRepository.save(user)
    expect(data.name).toBe('superTest')
    expect(data.email).toBe('superTest@test.com')
  })

  test('It Should find user by public_id', async () => {
    const user_public_id = 'abc-12345'

    const data = await userRepository.findById(user_public_id)
    expect(data.name).toBe('superTest')
    expect(data.email).toBe('superTest@test.com')
  })

  test('It Should list users', async () => {
    const data = await userRepository.list()
    expect(data.length).toBeGreaterThanOrEqual(1)
  })

  test('It Should findByEmail and update user', async () => {
    const user = {
      name: 'superTest teste',
      email: 'superTest@test.com',
      password: 'test',
      age: 49,
      isGuest: false,
      active: true,
      public_id: 'abc-12345'
    }
    const data = await userRepository.findByEmail('superTest@test.com')
    const updatedData = await userRepository.update(data.id, user)
    expect(updatedData.age).toBe(49)
  })

  test('It Should delete user', async () => {
    const user = await userRepository.deleteById('abc-12345')
    expect(user).toBe(undefined)
  })
})
