import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'
import { KafkaServiceProducer } from '@infra/services/kafkaProducer/KafkaProducer'

const usersRepository = new UsersRepository()
const kafkaServiceProduce = new KafkaServiceProducer()

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  kafkaServiceProduce
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export {
  createUserUseCase,
  createUserController
}
