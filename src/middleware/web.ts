import express, { type Application, type Request, type Response } from 'express'
import appMiddleware from '../middleware'

const web: Application = express()
web.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Mentalys REST API running!'
  })
})
web.use(appMiddleware)

export default web
