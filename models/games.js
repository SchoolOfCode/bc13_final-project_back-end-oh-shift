import { pool } from "../db/index.js";

export async function createGame(newGame) {
  const data = await pool.query(
    "INSERT INTO games (title, year_published, quantity, minimum_players, maximum_players, category, duration, difficulty, minimum_age, description, packaging_image_url, artwork_image_url, rules, skus, barcode, location, video_rules) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *;",
    [
      newGame.title,
      newGame.year_published,
      newGame.quantity,
      newGame.minimum_players,
      newGame.maximum_players,
      newGame.category,
      newGame.duration,
      newGame.difficulty,
      newGame.minimum_age,
      newGame.description,
      newGame.packaging_image_url,
      newGame.artwork_image_url,
      newGame.rules,
      newGame.skus,
      newGame.barcode,
      newGame.location,
      newGame.video_rules,
    ]
  );
  return data.rows[0];
}

export async function getGamesByFilter(
  difficulty,
  number_of_players,
  age,
  duration,
  genre
) {
  // specify base of sql statement
  const sqlParams = [];
  let sqlQuery = "SELECT * FROM games ";

  // check to see if any filter criteria is present in url request, if so, add 'where' to sql statement
  if (difficulty || number_of_players || age || duration || genre) {
    sqlQuery += "WHERE ";
    // console.log('sql query: ', sqlQuery)
  }

  // add to sql statement based on filter options: difficulty
  if (difficulty) {
    sqlParams.push(difficulty);
    sqlQuery += `difficulty = $${sqlParams.indexOf(difficulty) + 1}`;
    // console.log('sql query: ', sqlQuery)
    if (number_of_players || age || duration || genre) {
      sqlQuery += " AND difficulty IN (SELECT difficulty FROM games WHERE ";
    }
  }

  // add to sql statement based on filter options: number_of_players
  if (number_of_players) {
    sqlParams.push(number_of_players);
    sqlQuery += `maximum_players >= $${
      sqlParams.indexOf(number_of_players) + 1
    } AND minimum_players <= $${sqlParams.indexOf(number_of_players) + 1}`;
    // console.log('sql query: ', sqlQuery)
    if (age || duration || genre) {
      sqlQuery += " AND number_of_players IN (SELECT number_of_players FROM games WHERE ";
    }
  }

  // add to sql statement based on filter options: genre
  if (genre) {
  

    sqlParams.push(genre);
    sqlQuery += `$${sqlParams.indexOf(genre) + 1} = ANY(genre) `;
    // console.log('sql query: ', sqlQuery)
    if (duration || age) {
      sqlQuery += " AND genre IN (SELECT genre FROM games WHERE ";
    }
  }

//**TODO**//
  // add to sql statement based on filter options: duration
  // NEED TO FIND OUT DURATION TIME PERIODS TO CALCULATE RELEVANT RESULTS
  // **TODO**//

  // add to sql statement based on filter options: age
  if (age) {
    let ageQuery = [];

    for (let i = 0; i < age.length; i++) {
      if (age[i] == 10) {
        sqlParams.push(10);
        ageQuery.push(`minimum_age <= $${sqlParams.indexOf(10) + 1}`);
      }
      if (age[i] == 12) {
        sqlParams.push(10, 12);
        ageQuery.push(
          `minimum_age BETWEEN $${sqlParams.indexOf(10) + 1} AND $${sqlParams.indexOf(12) + 1}`
        );
      }
      if (age[i] == 17) {
        sqlParams.push(13, 17);
        ageQuery.push(
          `minimum_age BETWEEN $${sqlParams.indexOf(13) + 1} AND $${sqlParams.indexOf(17) + 1}`
        );
      }
      if (age[i] == 18) {
        sqlParams.push(18);
        ageQuery.push(`minimum_age >= $${sqlParams.indexOf(18) + 1}`);
      }
      if (age[i] == 0) {
        sqlParams.push(0, 100);
        ageQuery.push(
          `minimum_age BETWEEN $${sqlParams.indexOf(0) + 1} AND $${sqlParams.indexOf(100) + 1}`
        );
      }
    }

    // console.log(ageQuery)
    let joinedAgeQuery = ageQuery.join(" OR ")
    if ( difficulty || number_of_players || duration || genre) {
      
      joinedAgeQuery= joinedAgeQuery+')';
    }
  
    // console.log(joinedAgeQuery)

    // sqlParams.push(age)
    sqlQuery += `${joinedAgeQuery} `;
    // console.log(sqlQuery)
    // console.log('sql query: ', sqlQuery)
  }

  console.log(sqlParams);
  console.log(sqlQuery);

  const result = await pool.query(sqlQuery, sqlParams);
  const games = result.rows;
  return games;
}
