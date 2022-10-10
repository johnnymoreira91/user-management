import { database } from '@database/knex'
import { PermissionModel } from '@infra/ModelInfra/Permission'

async function createSchema () {
  if (await !database.schema.hasTable('users')) {
    return { message: 'Table already exist' }
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await database.schema.createTable('permissions', table => {
    table.increments('id').primary()
    table.string('name', 100).notNullable()
    table.integer('level', 2).notNullable()
  })

  await database.schema.createTable('users', table => {
    table.increments('id').primary()
    table.uuid('public_id').unique()
    table.string('name', 100).notNullable()
    table.string('email', 100).notNullable()
    table.string('password', 100).notNullable()
    table.integer('permission', 2).unsigned().references('level').inTable('permissions').notNullable()
    table.integer('age', 3).notNullable()
    table.boolean('isGuest').defaultTo(false)
    table.boolean('active').defaultTo(true)
  })

  const retPermission = await createPermissions()
  if (retPermission === false) {
    return { message: 'Error to create permissions' }
  }
  return { message: 'Tables created' }
}

async function createPermissions (): Promise<boolean> {
  try {
    await database.transaction(async trx => {
      await PermissionModel.query(trx).insert({
        name: 'User',
        level: 0
      })
      await PermissionModel.query(trx).insert({
        name: 'Func1',
        level: 1
      })
      await PermissionModel.query(trx).insert({
        name: 'Func1',
        level: 2
      })
      await PermissionModel.query(trx).insert({
        name: 'Manager',
        level: 3
      })
      await PermissionModel.query(trx).insert({
        name: 'UOwnerer',
        level: 4
      })
      await PermissionModel.query(trx).insert({
        name: 'Po',
        level: 5
      })
      await PermissionModel.query(trx).insert({
        name: 'Admin',
        level: 6
      })
    })
    return true
  } catch (error) {
    return false
  }
}

export { createSchema }
