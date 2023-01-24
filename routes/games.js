import express from "express";
import * as gamesModel from "../models/games.js";

export const gamesRouter = express.Router();

// 🤖 POST createGame
/**
 * Dev Ex POST route for adding new games to database.
 * Accessed at '.../api/games'
 * Invokes createGame function, providing argument of 'newGame' object created by request body
 * Returns status code, success boolean and payload(confirmation of newGame)
 */
gamesRouter.post("/", async function (req, res) {
  console.log(req.body);
  const newGame = req.body;
  const result = await gamesModel.createGame(newGame);
  res.status(201).json({ success: true, payload: result });
});

// 🤖 GET getByFilter
/**
 * GET route for returning games from database depending on some, all or no filter values.
 * Accessed at '.../api/games?<<parameters go here>>' e.g. '.../api/games?difficulty=hard&genre=adventure'
 * Invokes getByFilter function using any filter parameters provided in url as argument
 * Returns status code, success boolean and payload(array of games that match filter parameters)
 */
gamesRouter.get("/", async function (req, res) {
  const difficulty = req.query.difficulty;
  const number_of_players = req.query.number_of_players;
  const duration = req.query.duration;
  const genre = req.query.genre;
  const rating = req.query.rating;
  const age = req.query.age;
  const sort_by = req.query.sort_by;
  const title = req.query.title;

  const games = await gamesModel.getByFilter(
    difficulty,
    number_of_players,
    age,
    duration,
    genre,
    rating,
    sort_by,
    title
  );
  res.status(200).json({
    success: true,
    payload: games,
  });
});

// 🤖 GET getById
/**
 * GET route for returning games from database where game id = url parameter id
 * Accessed at '.../api/games/:id'
 * Invokes getById function using url id as argument
 * Returns status code, success boolean and payload(game object)
 */
gamesRouter.get("/:id", async function (req, res) {
  const id = req.params.id;
  const game = await gamesModel.getByID(id);
  res.status(200).json({
    success: true,
    payload: game,
  });
});


// 🤖 GET <category>FilterHandler
/**
 * GET route for returning list of available options to search databse by for each filter category, used to populate options for front-end dropdown filter components
 * Accessed at '.../api/games/filters/:category'
 * Invokes either genreFilterHandler, difficultyFilterHandler or durationFilterHandler function depending on url category
 * Returns status code, success boolean and payload(array of options)
 */
gamesRouter.get("/filters/:category", async function (req, res) {
  const category = req.params.category;
  console.log(category);

  if (category == "genre") {
    const options = await gamesModel.genreFilterHandler();
    return res.status(200).json({
      success: true,
      payload: options,
    });
  }
  if (category == "difficulty") {
    const options = await gamesModel.difficultyFilterHandler();
    return res.status(200).json({
      success: true,
      payload: options,
    });
  }
  if (category == "duration") {
    const options = await gamesModel.durationFilterHandler();
    return res.status(200).json({
      success: true,
      payload: options,
    });
  } else {
    return res.status(401).json({
      success: false.value,
      payload: "Filter options for this category are not available",
    });
  }
});
