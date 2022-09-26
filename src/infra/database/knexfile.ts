// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:'
    },
    pool: {
      min: 2,
      max: 60,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 60 * 1000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false
    }
  },

  dev: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'devDb.db'
    },
    pool: {
      min: 2,
      max: 60,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 60 * 1000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  prod: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'prodDb.db'
    },
    pool: {
      min: 2,
      max: 60,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 60 * 1000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false
    }
  }

}
