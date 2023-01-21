import { pool } from "../db/index.js";

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
    "SELECT review_id, reviews.date_added, game_id, review_text,rating, user_given_name, user_picture, user_id, title FROM reviews JOIN games ON reviews.game_id= games.id WHERE games.id=$1 ORDER BY reviews.date_added DESC;",
    [gameId]
  );
  return data.rows;
}

/* Add average rating here */
