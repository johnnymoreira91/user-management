import { database } from '@database/knex'

async function createSchema () {
  if (await !database.schema.hasTable('users')) {
    return { message: 'Table already exist' }
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await database.schema.createTable('users', table => {
    table.increments('id').primary()
    table.uuid('public_id').unique()
    table.string('name', 100).notNullable()
    table.string('email', 100).notNullable()
    table.string('password', 100).notNullable()
    table.integer('age', 3).notNullable()
    table.boolean('isGuest').defaultTo(false)
    table.boolean('active').defaultTo(true)
  })
  return { message: 'Tables created' }
}

export { createSchema }
