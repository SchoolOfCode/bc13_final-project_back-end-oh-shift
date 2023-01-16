import express from "express";
import * as gamesModel from "../models/games.js";

export const gamesRouter = express.Router();

/** Dev Ex post route for adding manually to new database */
gamesRouter.post("/", async function (req, res) {
  console.log(req.body);
  const newGame = req.body;
  const result = await gamesModel.createGame(newGame);
  res.status(201).json({ success: true, payload: result });
});

/** ultimate filter that adds filter conditions (difficulty, number_of_players, age, duration, genre)*/
gamesRouter.get("/", async function (req, res) {
  const difficulty = req.query.difficulty;
  const number_of_players = req.query.number_of_players;
  const duration = req.query.duration;
  const genre = req.query.genre;
  const age = req.query.age;

  const games = await gamesModel.getByFilter(
    difficulty,
    number_of_players,
    age,
    duration,
    genre
  );
  res.status(200).json({
    success: true,
    payload: games,
  });
});

/** Route- get by ID- ability to search/access a full description of a game */
gamesRouter.get("/:id", async function (req, res) {
  const id = req.params.id;
  const game = await gamesModel.getByID(id);
  res.status(200).json({
    success: true,
    payload: game,
  });
});

/**Route- ability to search/ access a data response for GENRE options
 * Options = same as result of fetch via this route
 */
gamesRouter.get("/genre", async function (req, res) {
  const category = req.params.category;
  console.log(category);
  const options = await gamesModel.filterHandler(category);
  res.status(200).json({
    success: true,
    payload: options,
  });
});

/**Route- ability to search/ access a data response with filter options applied
 * Options = same as result of fetch via this route
 */
gamesRouter.get("/filters/:category", async function (req, res) {
  const category = req.params.category;
  console.log(category);

  if (category == 'genre') {
    const options = await gamesModel.genreFilterHandler()
    return res.status(200).json({
      success: true,
      payload: options,
    });
  } if (category == 'difficulty') {
  const options = await gamesModel.difficultyFilterHandler();
  return res.status(200).json({
    success: true,
    payload: options,
  });
} if (category == 'duration') {
  const options = await gamesModel.durationFilterHandler();
  return res.status(200).json({
    success: true,
    payload: options,
  });
} else {
  return res.status(401).json({
    success: false.value,
    payload: 'Filter options for this category are not available'
  })
}
});
