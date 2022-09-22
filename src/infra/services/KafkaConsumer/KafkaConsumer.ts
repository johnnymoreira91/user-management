import { KafkaTopics } from '@shared/enum/KafkaConsumer'
import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload } from 'kafkajs'

class KafkaServiceConsumer {
  private kafkaConsumer: Consumer

  public constructor () {
    this.kafkaConsumer = this.createKafkaConsumer()
  }

  public async startConsumer (kafkaTopic: KafkaTopics): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: [`${kafkaTopic}`],
      fromBeginning: false
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
          console.log(`- ${prefix} ${message.key}#${message.value}`)
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async startBatchConsumer (): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: ['example-topic'],
      fromBeginning: false
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)
      await this.kafkaConsumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          const { batch } = eachBatchPayload
          for (const message of batch.messages) {
            const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)
          }
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async shutdown (): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }

  private createKafkaConsumer (): Consumer {
    const kafka = new Kafka({
      clientId: 'kafka-microServices',
      brokers: ['localhost:9092']
    })
    const consumer = kafka.consumer({ groupId: 'consumer-group' })
    return consumer
  }
}

export { KafkaServiceConsumer }
