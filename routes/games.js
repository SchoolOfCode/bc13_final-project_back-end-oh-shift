import express from 'express'
import * as gamesModel from '../models/games.js'

export const gamesRouter = express.Router()

gamesRouter.get('/', async function (req, res) {
  const games = await gamesModel.getAllGames()

  res.status(200).json({
    success: true,
    payload: games
  })
})

// gamesRouter.get('/:id', async function (req, res) {
//   const id = Number(req.params.id)
//   const bootcamper = await gamesModel.getBootcamperByID(id)

//   res.status(200).json({
//     success: true,
//     payload: bootcamper
//   })
// })

gamesRouter.post('/', async function (req, res) {
  console.log(req.body)
  const newGame = req.body
  const result = await gamesModel.createGame(newGame)
  res.status(201).json({ success: true, payload: result })
})

// gamesRouter.patch('/:id', async function (req, res) {
//   const id = Number(req.params.id)
//   const data = req.body
//   const result = await gamesModel.updateBootcamper(id, data)
//   res.json({ success: true, payload: result })
// })

// gamesRouter.delete('/:id', async function (req, res) {
//   const id = Number(req.params.id)
//   const result = await gamesModel.deleteBootcamper(id)
//   res.json({ success: true, payload: result })
// })