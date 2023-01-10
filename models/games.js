import { pool } from '../db/index.js'

export async function getAllGames() {
  const sqlQuery =
    'SELECT * FROM games'
  const result = await pool.query(sqlQuery)
  const games = result.rows
  return games
}

// export async function getBootcamperByID (id) {
//   const data = await pool.query(
//     'SELECT * FROM bootcampers WHERE id = $1',
//     [id]
//   )
//   return data.rows[0]
// }

export async function createGame (newGame) {
  const data = await pool.query(
    'INSERT INTO games (title, year_published, quantity, minimum_players, maximum_players, category, duration, difficulty, minimum_age, description, packaging_image_url, artwork_image_url, rules, skus, barcode, location, video_rules) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *;',
    [newGame.title, newGame.year_published, newGame.quantity, newGame.minimum_players, newGame.maximum_players, newGame.category, newGame.duration, newGame.difficulty, newGame.minimum_age, newGame.description, newGame.packaging_image_url, newGame.artwork_image_url, newGame.rules, newGame.skus, newGame.barcode, newGame.location, newGame.video_rules])
  return data.rows[0]
  }

  
// export async function updateBootcamper (id, updatedBootcamper) {
//   const data = await pool.query(
//     'UPDATE bootcampers SET username = $1, is_coach = $2 WHERE id = $3 RETURNING *;',
//     [updatedBootcamper.username, updatedBootcamper.is_coach, id]
//   )
//   return data.rows[0]
// }

// export async function deleteBootcamper (id) {
//   const data = await pool.query(
//     'DELETE FROM bootcampers WHERE id = $1 RETURNING *;',
//     [id]
//   )
//   return data.rows[0]
// }