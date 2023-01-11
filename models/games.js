import { pool } from '../db/index.js'

export async function getAllGames() {
  const sqlQuery =
    'SELECT * FROM games'
  const result = await pool.query(sqlQuery)
  const games = result.rows
  return games
}


export async function createGame (newGame) {
  const data = await pool.query(
    'INSERT INTO games (title, year_published, quantity, minimum_players, maximum_players, category, duration, difficulty, minimum_age, description, packaging_image_url, artwork_image_url, rules, skus, barcode, location, video_rules) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *;',
    [newGame.title, newGame.year_published, newGame.quantity, newGame.minimum_players, newGame.maximum_players, newGame.category, newGame.duration, newGame.difficulty, newGame.minimum_age, newGame.description, newGame.packaging_image_url, newGame.artwork_image_url, newGame.rules, newGame.skus, newGame.barcode, newGame.location, newGame.video_rules])
  return data.rows[0]
  }

export async function getGamesByFilter (difficulty, number_of_players, age, duration, genre) {

//specify base of sql statement
let sqlQuery = `SELECT * FROM games `;

//check to see if any filter criteria is present in url request, if so, add 'where' to sql statement
if (difficulty || number_of_players || age || duration || genre) {
  sqlQuery += `WHERE `;
  console.log('sql query: ', sqlQuery)
}

//add to sql statement based on filter options: difficulty
if (difficulty) {
  sqlQuery += `difficulty = $1`
  console.log('sql query: ', sqlQuery)
}
const result = await pool.query(sqlQuery, [difficulty])
const games = result.rows
return games
}