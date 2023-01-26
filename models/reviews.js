import { pool } from "../db/index.js";

/**
 * Function to add a review to reviews table of database
 * @param {*} newReview - object with game_id, review_text, rating, user_given_name, user_picture, user_id
 * @returns 
 */
export async function createReview(newReview) {
  const data = await pool.query(
    "INSERT INTO reviews (game_id, review_text, rating, user_given_name, user_picture, user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;",
    [
      newReview.game_id,
      newReview.review_text,
      newReview.rating,
      newReview.user_given_name,
      newReview.user_picture,
      newReview.user_id
    ]
  );
  return data.rows[0];
}

export async function getByGameId(gameId) {
  const data = await pool.query(
    "SELECT review_id, reviews.date_added, game_id, review_text,rating, user_given_name, user_picture, user_id, title, (SELECT AVG(rating) FROM reviews WHERE game_id=$1)::numeric(10, 1) as average_rating FROM reviews JOIN games ON reviews.game_id= games.id WHERE games.id=$1 ORDER BY reviews.date_added DESC;",
    [gameId]
  );
  return data.rows;
}


/* deletes specific review by id */
export async function deleteReview (reviewId) {
  const data = await pool.query(
    'DELETE FROM reviews WHERE review_id = $1 RETURNING *;',
    [reviewId]
  )
  return data.rows[0]
}``
