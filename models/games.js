import { pool } from "../db/index.js";

/**
 * Function that sends an 'INSERT INTO...' SQL statement to the database, populating a row with all object data provided from POST route
 * @param {*} newGame - an object with title, year_published, quantity, minimum_players, maximum_players, genre, duration, difficulty, mininmum_age, description, packaging_image_url, artwork_image_url, rules, barcode, location and video_rules
 * @returns new game object added to database via SQL query
 */
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

/**
 * Function takes in variables from request parameters and builds out SQL query based on category values, returning all games in database that match provided filter options. If filter parameters are provided, these are passed to the 'WHERE' values in the SQL statement. If any or all filter parameters are ommited, this function will return all games in database as the SQL query defaults as SELECT all from games.
 * SQL query is built as function moves through if statements and adds values to SQL query and query syntax if a value is detected
 * @param {*} difficulty 
 * @param {*} number_of_players 
 * @param {*} age 
 * @param {*} duration 
 * @param {*} genre 
 * @param {*} rating 
 * @param {*} sort_by 
 * @param {*} title 
 * @returns object with array of game objects that match the SQL query criteria
 */

export async function getByFilter(
  difficulty,
  number_of_players,
  age,
  duration,
  genre,
  rating,
  sort_by,
  title
) {
  console.log("🤖 getByFilter function running");
  const sqlParams = [];
  let sqlQuery = "select id, title, year_published, games.date_added quantity, minimum_players, maximum_players, genre, duration, difficulty, minimum_age, description, packaging_image_url, artwork_image_url, rules, barcode, location, video_rules, AVG(rating) AS average_rating FROM games LEFT JOIN reviews ON games.id = reviews.game_id";

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

  if (title) {
    sqlParams.length > 0 ? (sqlQuery += " AND") : (sqlQuery += " WHERE");
    sqlParams.push(`%${title}%`);
    sqlQuery += ` title ILIKE $${sqlParams.length}`;
  }
  
  sqlQuery += " group by id, title, year_published, games.date_added, quantity, minimum_players, maximum_players, genre, duration, difficulty, minimum_age, description, packaging_image_url, artwork_image_url, rules, barcode, location, video_rules";

  if (rating && rating !== 'all') {
    sqlParams.push(rating);
    sqlQuery += ` HAVING AVG(rating) >= $${sqlParams.length} AND AVG(rating) < ${(+rating) + 1}`;
  }

  if (sort_by == "az") {
    sqlQuery += ` ORDER BY title ASC`;
  }
  
  if (sort_by == "za") {
    sqlQuery += ` ORDER BY title DESC`;
  }
  
  if (sort_by == "new") {
    sqlQuery += ` ORDER BY year_published DESC`;
  }
  
  if (sort_by == "old") {
    sqlQuery += ` ORDER BY year_published ASC`;
  }

  if (sort_by == "rating") {
    sqlQuery += ` ORDER BY average_rating DESC`;
  }

  sqlQuery += ";";
  console.log('❓ sqlQuery:', sqlQuery, 'sqlParams:', sqlParams);
  const result = await pool.query(sqlQuery, sqlParams);
  const games = result.rows;

  games.map((game, index)=>{
    if (game.average_rating==null) {
      console.log(games[index].average_rating)
      games[index].average_rating='0'
      console.log(games[index].average_rating)
    }
  })

  return games;
}

/**
 * Function that returns specific game by game id ('id' column in 'games' table of SQL database)
 * @param {*} id - id of game
 * @returns game object where id = id parameter
 */
export async function getByID(id) {
  const data = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
  return data.rows[0];
}

/**
 * Function to select distinct options to populate select drop-down options for front-end genre filter component.
 * Searches through all games in database and returns unique genre values in alphabetical order
 * @returns array of genres in key pair value format e.g. [{genre: adventure}, {genre: puzzle}] 
 */
export async function genreFilterHandler() {
  const data = await pool.query(
    `SELECT DISTINCT unnest(genre) as genre FROM games ORDER BY UNNEST(genre) ASC;`
  );

  const options = data.rows;
  return options;
}

/**
 * Function to select distinct options to populate select drop-down options for front-end difficulty filter component.
 * Searches through all games in database and returns unique difficulty values in 'easy>intermediate>hard' order
 * @returns array of difficulty in key pair value format e.g. [{difficulty: easy}, {difficulty: hard}] 
 */
export async function difficultyFilterHandler() {
  const data =
    await pool.query(`SELECT DISTINCT difficulty FROM games WHERE difficulty IN (
    SELECT difficulty from games
    ORDER BY case
    WHEN difficulty = 'easy' THEN 1
    WHEN difficulty = 'intermediate' THEN 2
    WHEN difficulty = 'hard' THEN 3
    END);`);
  const options = data.rows;
  return options;
}

/**
 * Function to select distinct options to populate select drop-down options for front-end duration filter component.
 * Searches through all games in database and returns unique duration values in order from smallest to largest
 * @returns array of difficulty in key pair value format e.g. [{duration: 30}, {duration: 60}, {duration: 120}] 
 */
export async function durationFilterHandler() {
  const data = await pool.query(
    `SELECT DISTINCT duration FROM games ORDER BY duration ASC;`
  );
  const options = data.rows;
  return options;
}
