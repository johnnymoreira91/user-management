import { CreateUserUseCase } from '../CreateUserUseCase'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { KafkaServiceProducer } from '@infra/services/kafkaProducer/KafkaProducer'
import { InsertMock } from '@utils/mock'
import { database } from '@infra/database/knex'

describe('CreateUserUseCase test', () => {
  let createUserUseCase: CreateUserUseCase
  let userRepository: UsersRepository
  let kafkaServiceProducer: KafkaServiceProducer

  beforeAll(async () => {
    userRepository = new UsersRepository()
    kafkaServiceProducer = new KafkaServiceProducer()
    createUserUseCase = new CreateUserUseCase(
      userRepository,
      kafkaServiceProducer
    )
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
      active: true
    }

    const data = await createUserUseCase.execute(user)
    expect(data.name).toBe('superTest')
    expect(data.email).toBe('superTest@test.com')
  })

  test('It Should give error to duplicate users', async () => {
    const user = {
      name: 'superTest',
      email: 'superTest@test.com',
      password: 'test',
      age: 50,
      isGuest: false,
      active: true
    }

    try {
      const data = await createUserUseCase.execute(user)
      expect(data.name).toBe('superTest')
    } catch (error) {
      expect(error.message).toBe('User already exist')
    }
  })
})
