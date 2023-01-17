import { pool } from "../db/index.js";

/**Dev Ex- add games to database query */
export async function createGame(newGame) {
  const data = await pool.query(
    "INSERT INTO games (title, year_published, quantity, minimum_players, maximum_players, genre, duration, difficulty, minimum_age, description, packaging_image_url, artwork_image_url, rules, barcode, location, video_rules) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;",
    [
      newGame.title,
      newGame.year_published,
      newGame.quantity,
      newGame.minimum_players,
      newGame.maximum_players,
      newGame.genre,
      newGame.duration,
      newGame.difficulty,
      newGame.minimum_age,
      newGame.description,
      newGame.packaging_image_url,
      newGame.artwork_image_url,
      newGame.rules,
      newGame.barcode,
      newGame.location,
      newGame.video_rules,
    ]
  );
  return data.rows[0];
}


//**Filters games by difficulty, number of players, age, duration and genre paramaters

export async function getByFilter(
  difficulty,
  number_of_players,
  age,
  duration,
  genre
) {
  console.log("createQuery running");
  const sqlParams = [];
  let sqlQuery = "SELECT * FROM games";

  if (difficulty) {
    sqlParams.length > 0 ? (sqlQuery += " AND") : (sqlQuery += " WHERE");
    sqlParams.push(difficulty);
    sqlQuery += ` difficulty = $${sqlParams.length}`;
  }

  if (number_of_players) {
    sqlParams.length > 0 ? (sqlQuery += " AND") : (sqlQuery += " WHERE");
    sqlParams.push(number_of_players);
    sqlQuery += ` minimum_players <= $${sqlParams.length} AND maximum_players >= $${sqlParams.length}`;
  }

  if (age) {
    sqlParams.length > 0 ? (sqlQuery += " AND") : (sqlQuery += " WHERE");
    sqlParams.push(age);
    sqlQuery += ` minimum_age <= $${sqlParams.length}`;
  }

  if (duration) {
    sqlParams.length > 0 ? (sqlQuery += " AND") : (sqlQuery += " WHERE");
    sqlParams.push(duration);
    sqlQuery += ` duration <= $${sqlParams.length}`;
  }

  if (genre) {
    sqlParams.length > 0 ? (sqlQuery += " AND") : (sqlQuery += " WHERE");
    sqlParams.push(genre);
    sqlQuery += ` $${sqlParams.length} = ANY(genre)`;
  }

  sqlQuery += ";";
  console.log(sqlQuery, sqlParams);
  const result = await pool.query(sqlQuery, sqlParams);
  const games = result.rows;
  return games;
}

export async function getByID(id) {
  const data = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
  return data.rows[0];
}

/**Function to select distinct options from filter categories (dropdown values in filter component)- reuseable for all filter categories  */
export async function genreFilterHandler() {
  const data = await pool.query(`SELECT DISTINCT unnest(genre) as genre FROM games ORDER BY UNNEST(genre) ASC;`);
  const options = data.rows;
  return options;
}
// Thing to consider: avoiding SQL injection/ formatting to be more secure path

/**Function to select distinct DIFFICULTY options from filter categories (dropdown values in filter component)-   */
export async function difficultyFilterHandler() {
  const data = await pool.query(`SELECT DISTINCT difficulty FROM games WHERE difficulty IN (
    SELECT difficulty from games
    ORDER BY case
    WHEN difficulty = 'easy' THEN 1
    WHEN difficulty = 'intermediate' THEN 2
    WHEN difficulty = 'hard' THEN 3
    END);`);
  const options = data.rows;
  return options;
}
// Thing to consider: avoiding SQL injection/ formatting to be more secure path

/**Function to select distinct DURATION options from filter categories (dropdown values in filter component)-   */
export async function durationFilterHandler() {
  const data = await pool.query(`SELECT DISTINCT duration FROM games ORDER BY duration ASC;`);
  const options = data.rows;
  return options;
}
// Thing to consider: avoiding SQL injection/ formatting to be more secure path