import { User } from '@entities/User'
import { KafkaServiceProducer } from '@infra/services/kafkaProducer/KafkaProducer'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { KafkaTopics } from '@shared/enum/KafkaConsumer'
import { ICreateUserRequestDTO } from './CreateUserDTO'

class CreateUserUseCase {
  constructor (
    private usersRepository: IUsersRepository,
    private kafkaServiceProducer: KafkaServiceProducer
  ) {}

  async execute (data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExist = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExist) {
      throw new Error('User already exist')
    }

    const user = new User(data)
    const kafka = await this.kafkaServiceProducer.start()
    // const newUser = await this.usersRepository.save(user)
    // await this.kafkaServiceProducer.sendMessage(newUser, KafkaTopics.emailUser)
    // await this.kafkaServiceProducer.shutdown()
    // return newUser
    if (kafka) {
      const newUser = await this.usersRepository.save(user)
      await this.kafkaServiceProducer.sendMessage(newUser, KafkaTopics.emailUser)
      await this.kafkaServiceProducer.shutdown()
      return newUser
    } else {
      throw new Error('Kafka service is down')
    }
  }
}

export { CreateUserUseCase }
