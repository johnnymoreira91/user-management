import Breaker from 'opossum'
import { delayedFunction } from './delayFunction'

class CircuitBreaker {
  private circuitBreaker: Breaker
  constructor () {
    this.init()
  }

  private init () {
    const circuitBreakerOptions = {
      errorThresholdPercentage: 50,
      timeout: 1000,
      resetTimeout: 5000
    }
    this.circuitBreaker = new Breaker(delayedFunction, circuitBreakerOptions)
    this.circuitBreaker.fallback((error) => {
      if (error) {
        console.log(error.message)
        return error.message
      }
      console.log('Fallback')
      return 'Fallback'
    })
    this.circuitBreaker.on('halfOpen', () => {
      console.log('Circuit breaker is halfOpen')
    })
    this.circuitBreaker.on('open', () => {
      console.log('Circuit breaker is open')
    })
    this.circuitBreaker.on('close', () => {
      console.log('Circuit breaker is closed')
    })
  }

  public async fire () {
    await this.circuitBreaker.fire()
  }
}

export { CircuitBreaker }
