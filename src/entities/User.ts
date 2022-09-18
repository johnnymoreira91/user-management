import { v4 as uuidv4 } from 'uuid'

class User {
  public readonly id?: number
  public readonly public_id: string

  public name: string
  public email: string
  public password: string
  public age: number
  public isGuest: boolean
  public active: boolean

  constructor (props: Omit<User, 'id' | 'public_id'>, public_id: string = uuidv4()) {
    // if (!public_id) {
    //   this.id = uuidv4()
    // }
    this.public_id = public_id
    Object.assign(this, props)
  }
}

export { User }
