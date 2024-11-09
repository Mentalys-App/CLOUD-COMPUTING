import { Request, Router, Response, NextFunction } from 'express'
import authRouter from './authRoute'
import { notFound } from '@/middleware/error/notFound'
import { globalErrorHandler } from '@/middleware/error/error'
import { authenticateUser } from '@/middleware/authMiddleware'

const app: Router = Router()

app.get(
  '/autentikasi',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Mentalys REST API Anda terautentikasi!'
    })
  }
)
app.use('/api/auth', authRouter)
app.use('*', notFound)
app.use(globalErrorHandler)
export default app
