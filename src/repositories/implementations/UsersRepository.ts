import { User } from '@entities/User'
import { database } from '@infra/database/knex'
import { UserModel } from '@infra/ModelInfra/User'
import { IUsersRepository } from '@repositories/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private users: User[] = []

  async list (): Promise<User[]> {
    return UserModel.query()
  }

  async findById (id: string): Promise<User> {
    return UserModel.query().where('public_id', id).first()
  }

  async findByEmail (email: string): Promise<User> {
    return UserModel.query().where('email', email).first()
  }

  async update (id: number, user: User): Promise<User> {
    // const findUser = await UserModel.query().where('id', id).first()
    await database.transaction(async trx => {
      return await UserModel.query(trx).update({
        active: user.active,
        age: user.age,
        email: user.email,
        name: user.name,
        password: user.password,
        // public_id: findUser.public_id,
        isGuest: user.isGuest
        // id: findUser.id
      })
    })
    return user
  }

  async save (user: User): Promise<User> {
    await database.transaction(async trx => {
      // await UserModel.query(trx).insert({
      //   name: user.name,
      //   email: user.email,
      //   password: user.password,
      //   active: user.active,
      //   age: user.age,
      //   isGuest: user.isGuest,
      //   public_id: user.public_id,
      //   permission: user.permission
      // })
      await UserModel.query(trx).insert({ ...user })
    })
    return user
  }

  async deleteById (public_id: string): Promise<void> {
    const user = await UserModel.query().where('public_id', public_id).first()
    await database.transaction(async trx => {
      await UserModel.query(trx).deleteById(user.id)
    })
  }
}

export { UsersRepository }
