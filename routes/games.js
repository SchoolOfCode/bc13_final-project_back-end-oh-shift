import express from 'express'
import * as gamesModel from '../models/games.js'

export const gamesRouter = express.Router()

// gamesRouter.get('/', async function (req, res) {
//   const games = await gamesModel.getAllGames()

//   res.status(200).json({
//     success: true,
//     payload: games
//   })
// })

gamesRouter.post('/', async function (req, res) {
  console.log(req.body)
  const newGame = req.body
  const result = await gamesModel.createGame(newGame)
  res.status(201).json({ success: true, payload: result })
})

// ultimate filter that adds filter conditions (difficulty, number_of_players, age, duration, genre)
gamesRouter.get('/', async function (req, res) {
  const difficulty = req.query.difficulty
  console.log('console log difficulty', difficulty)
  const number_of_players = req.query.number_of_players
  const age = req.query.age
  const duration = req.query.duration
  const genre = req.query.genre
  const games = await gamesModel.getGamesByFilter(difficulty, number_of_players, age, duration, genre)
  res.status(200).json({
    success: true,
    payload: games
  })
})
