// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
      connection: {
        host: 'localhost',
        port: 5432,
        user: 'hp',
        password: '123456',
        database: 'spotify',
      },
      pool: {
        min: 2,
        max: 50,
      },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
