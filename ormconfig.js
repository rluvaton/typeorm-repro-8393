module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,

  // Change to ['query'] to see the update command
  logging: false,

  entities: [
    'src/entity/*.ts'
  ],
  cli: {
    entitiesDir: 'src/entity',
  }
}
