import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { CreateUserUseCase } from '@useCases/CreateUser/CreateUserUseCase'
import { User } from '@entities/User'
import { createSchema } from '@infra/database/createTables'
import { database } from '@infra/database/knex'

const userRepository = new UsersRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)

const userTest = new User({
  name: 'test',
  email: 'test@test.com',
  password: 'test',
  age: 20,
  active: true,
  isGuest: false
})
const userSuper = new User({
  name: 'super',
  email: 'super@super.com',
  password: 'super',
  age: 21,
  active: true,
  isGuest: false
})
const userNormal = new User({
  name: 'normal',
  email: 'normal@normal.com',
  password: 'normal',
  age: 22,
  active: true,
  isGuest: false
})
const userGuest = new User({
  name: 'guest',
  email: 'guest@guest.com',
  password: 'guest',
  age: 22,
  active: true,
  isGuest: true
})

async function InsertMock () {
  await database.schema.dropTableIfExists('users')
  await createSchema()
  // const userArray: User[] = []
  await createUserUseCase.execute(userTest)
  await createUserUseCase.execute(userSuper)
  await createUserUseCase.execute(userNormal)
  await createUserUseCase.execute(userGuest)
}

export { InsertMock }
