import { pool } from "../db/index.js";

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

// export async function getGamesByFilter(
//   difficulty,
//   number_of_players,
//   age,
//   duration,
//   genre
// ) {
//   // specify base of sql statement
//   let paramCount = []
//   if (difficulty) {paramCount.push('difficulty')}
//   if (number_of_players) {paramCount.push('minimum_players')}
//   if (genre)     paramCount.push('genre');
//   if (duration) {paramCount.push('duration')}
//   if (age) {paramCount.push('age')}

//   const sqlParams = [];
//   let sqlQuery = "SELECT * FROM games ";

//   // check to see if any filter criteria is present in url request, if so, add 'where' to sql statement
//   if (difficulty || number_of_players || age || duration || genre) {
//     sqlQuery += "WHERE ";
//     // console.log('sql query: ', sqlQuery)
//   }

//   // add to sql statement based on filter options: difficulty
//   if (difficulty) {
//     sqlParams.push(difficulty);
//     sqlQuery += `difficulty = $${sqlParams.indexOf(difficulty) + 1}`;
//     console.log('paramcount index: ', paramCount[paramCount.indexOf('difficulty')+1])
//     if (paramCount[paramCount.indexOf('difficulty')+1]) {
//       sqlQuery += ` AND ${paramCount[paramCount.indexOf('difficulty')+1]} IN (SELECT ${paramCount[paramCount.indexOf('difficulty')+1]} FROM games WHERE `;
//     }
//   }

//   // add to sql statement based on filter options: number_of_players
//   if (number_of_players) {
//     sqlParams.push(number_of_players);
//     sqlQuery += `maximum_players >= $${
//       sqlParams.indexOf(number_of_players) + 1
//     } AND minimum_players <= $${sqlParams.indexOf(number_of_players) + 1}`;
//     console.log('paramcount index: ', paramCount[paramCount.indexOf('minimum_players')+1])
//         if (paramCount[paramCount.indexOf('minimum_players')+1]) {
//       sqlQuery += ` AND ${paramCount[paramCount.indexOf('minimum_players')+1]} IN (SELECT ${paramCount[paramCount.indexOf('minimum_players')+1]} FROM games WHERE `;
//     }
//   }

//   // add to sql statement based on filter options: genre
//   if (genre) {
//     sqlParams.push(genre);
//     sqlQuery += `$${sqlParams.indexOf(genre) + 1} = ANY(genre) `;
//     console.log('paramcount index: ', paramCount[paramCount.indexOf('genre')+1])
//         if (paramCount[paramCount.indexOf('genre')+1]) {
//       sqlQuery += ` AND ${paramCount[paramCount.indexOf('genre')+1]} IN (SELECT ${paramCount[paramCount.indexOf('genre')+1]} FROM games WHERE `;
//     }
//   }

//   // add to sql statement based on filter options: duration
//   if (duration) {
//     console.log('DURATION =', duration)
//     let durationQuery = [];
//     let userDuration = [];
//     userDuration.push(duration)
//     console.log('userDuration', userDuration)


//     for (let i = 0; i <= duration.length; i++) {
//       if (duration[i] == '30' || userDuration[i] == '30') {
//         sqlParams.push(30);
//         durationQuery.push(`duration <= $${sqlParams.indexOf(30) + 1}`);
//       }
//       if (duration[i] == '60' || userDuration[i] == '60') {
//         sqlParams.push(29, 89);
//         durationQuery.push(`duration BETWEEN $${sqlParams.indexOf(29) + 1} AND $${sqlParams.indexOf(89) + 1}`);
//       }
//       if (duration[i] == '90' || userDuration[i] == '90') {
//         sqlParams.push(90);
//         durationQuery.push(`duration >= $${sqlParams.indexOf(90) + 1}`);
//       }

//       if (duration[i] == 'any'  || userDuration[i] == 'any') {
//         sqlParams.push(0);
//         durationQuery.push(
//           `duration > $${sqlParams.indexOf(0) + 1}`
//         );
//       }
//     }

//     console.log('duration query', durationQuery)
//     let joinedDurationQuery = durationQuery.join(" OR ")
  
//     console.log(joinedDurationQuery)

//     sqlQuery += `${joinedDurationQuery} `;
//     console.log('paramcount index: ', paramCount[paramCount.indexOf('duration')+1])

//     if ( paramCount[paramCount.indexOf('duration')+1] ) {
//       sqlQuery += ` AND ${paramCount[paramCount.indexOf('duration')+1]}  IN (SELECT ${paramCount[paramCount.indexOf('duration')+1]}  FROM games WHERE `;
//     }
//   }

//   // add to sql statement based on filter options: age
//   if (age) {
//     console.log('AGE = ', age)
//     let ageQuery = [];
//     let userAge = [];
//     userAge.push(age)
//     console.log('userAge', userAge, userAge.length)
//     console.log('age', age, age.length)
  

//     for (let i = 0; i < age.length; i++) {
//       if (age[i] == '10' || userAge[i] == '10') {
//         sqlParams.push(10);
//         ageQuery.push(`minimum_age <= $${sqlParams.indexOf(10) + 1}`);
//       }
//       if (age[i] == '12' || userAge[i] == '12') {
//         sqlParams.push(10, 12);
//         ageQuery.push(`minimum_age BETWEEN $${sqlParams.indexOf(10) + 1} AND $${sqlParams.indexOf(12) + 1}`
//         );
//       }
//       if (age[i] == '17' || userAge[i] == '17') {
//         sqlParams.push(13, 17);
//         ageQuery.push(`minimum_age BETWEEN $${sqlParams.indexOf(13) + 1} AND $${sqlParams.indexOf(17) + 1}`
//         );
//       }
//       if (age[i] == '18' || userAge[i] == '18') {
//         sqlParams.push(18);
//         ageQuery.push(`minimum_age >= $${sqlParams.indexOf(18) + 1}`);
//       }
//       if (age[i] == 'any' || userAge[i] == 'any') {
//         sqlParams.push(1);
//         ageQuery.push(
//           `minimum_age > $${sqlParams.indexOf(1) + 1}`
//         );
//       }
//     }

//     console.log('ageQuery', ageQuery)
//     let joinedAgeQuery = ageQuery.join(" OR ")

//     console.log('paramcount index: ', paramCount[paramCount.indexOf('age')+1])
//     if ( paramCount[paramCount.indexOf('age')+1]) {
//       joinedAgeQuery= joinedAgeQuery+')';
//     }
  

//     sqlQuery += `${joinedAgeQuery} `;
//     console.log('joinedAgeQuery', joinedAgeQuery)


//   }

//   console.log('param count', paramCount)
//   // console.log(joinedAgeQuery)
//   if (paramCount.length === 5) {
//     sqlQuery= sqlQuery+'))))';
//   }
//   if (paramCount.length === 4) {
//     sqlQuery= sqlQuery+')))';
//   }
//   if (paramCount.length === 3) {
//     sqlQuery= sqlQuery+'))'
//   }


//   console.log(sqlParams);
//   console.log(sqlQuery);
  

//   const result = await pool.query(sqlQuery, sqlParams);
//   const games = result.rows;
//   return games;
// }




///elijah's version
export async function createQuery(difficulty,
  number_of_players,
  age,
  duration,
  genre) {

  const sqlParams = [];
  let sqlQuery = "SELECT * FROM games";
  
  if (difficulty) {
    (sqlParams.length > 0) ? sqlQuery += ' AND' : sqlQuery += ' WHERE'
    ;
    sqlParams.push(difficulty);
    sqlQuery += ` difficulty = $${sqlParams.length}`;
  }

  if (number_of_players) {
    (sqlParams.length > 0) ? sqlQuery += ' AND' : sqlQuery += ' WHERE'
    sqlParams.push(number_of_players);
    sqlQuery += ` minimum_players <= $${sqlParams.length} AND maximum_players >= $${sqlParams.length}`;
  }

  if (age) {
    (sqlParams.length > 0) ? sqlQuery += ' AND' : sqlQuery += ' WHERE'
    sqlParams.push(age);
    sqlQuery += ` minimum_age <= $${sqlParams.length}`;
  }

  if (duration) {
    (sqlParams.length > 0) ? sqlQuery += ' AND' : sqlQuery += ' WHERE'
    sqlParams.push(duration);
    sqlQuery += ` duration <= $${sqlParams.length}`
  }

  if (genre) {
    (sqlParams.length > 0) ? sqlQuery += ' AND' : sqlQuery += ' WHERE'
    sqlParams.push(genre);
    sqlQuery += ` $${sqlParams.length} = ANY(genre)`
  }

  sqlQuery += ';'
  console.log(sqlQuery, sqlParams)
  const result = await pool.query(sqlQuery, sqlParams);
  const games = result.rows;
  return games;
}



