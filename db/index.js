import pg from 'pg'

const databaseUrl = process.env.DATABASE_URL

if (undefined === databaseUrl) {
  throw new Error(
    'This project requires a database url. Did you forget to create a .env file? Please ensure a .env file exists at the root of the project and that it contains a DATABASE_URL variable.'
  )
}

export const pool = new pg.Pool({
  connectionString: databaseUrl
})