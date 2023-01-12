import express from 'express'
import * as gamesModel from '../models/games.js'

export const gamesRouter = express.Router()

gamesRouter.post('/', async function (req, res) {
  console.log(req.body)
  const newGame = req.body
  const result = await gamesModel.createGame(newGame)
  res.status(201).json({ success: true, payload: result })
})

// ultimate filter that adds filter conditions (difficulty, number_of_players, age, duration, genre)
gamesRouter.get('/', async function (req, res) {
  const difficulty = req.query.difficulty
  const number_of_players = req.query.number_of_players
  const duration = req.query.duration
  const genre = req.query.genre
  const age = req.query.age

  console.log('age param', age)

  const games = await gamesModel.getGamesByFilter(difficulty, number_of_players, age, duration, genre)
  res.status(200).json({
    success: true,
    payload: games
  })
})
