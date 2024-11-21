import { Router, Request, Response, NextFunction } from 'express'
import { authenticateUser } from '../middleware/auth.middleware'
import { handleAudioPrediction, handleQuizPrediction } from '@/controllers/ml.controller'
import { uploadAudio } from '@/utils/uploadML'
import handleAxiosError from '@/middleware/axiosErrorHandler'
import { AuthenticatedRequest } from '@/types/AuthenticatedRequest.type'

const mlRouter: Router = Router()

mlRouter.post(
  '/quiz',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  async (req: Request, res: Response, next: NextFunction) => {
    handleQuizPrediction(req as AuthenticatedRequest, res, next)
  }
)

mlRouter.post(
  '/audio',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  uploadAudio.single('audio'),
  async (req: Request, res: Response, next: NextFunction) => {
    handleAudioPrediction(req as AuthenticatedRequest, res, next)
  }
)
mlRouter.use(handleAxiosError)

export default mlRouter
