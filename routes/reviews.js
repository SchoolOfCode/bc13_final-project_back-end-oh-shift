import express from "express";
import * as reviewsModel from "../models/reviews.js";

export const reviewsRouter = express.Router();

/* post review to database*/
reviewsRouter.post("/", async function (req, res) {
  console.log(req.body);
  const newReview = req.body;
  const result = await reviewsModel.createReview(newReview);
  res.status(201).json({ success: true, payload: result });
});

/* Get reviews  */
reviewsRouter.get("/:gameId", async function (req, res) {
  const gameId = req.params.gameId;
  const reviews = await reviewsModel.getByGameId(gameId);
  res.status(200).json({ success: true, payload: reviews });
});

/*delete specific review by id */
reviewsRouter.delete("/:id", async function (req, res) {
  const reviewId = req.params.id;
  const result = await reviewsModel.deleteReview(reviewId);
  res.status(200).json({sucess: true, payload: {message: 'Review deleted!', deletedReview: result }})
})