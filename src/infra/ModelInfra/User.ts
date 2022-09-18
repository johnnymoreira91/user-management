import { Model } from '@infra/database/knex'

class UserModel extends Model {
  id: number
  name: string
  email: string
  password: string
  age: number
  public_id: string
  isGuest: boolean
  active: boolean

  static get tableName () {
    return 'users'
  }
}

export { UserModel }
