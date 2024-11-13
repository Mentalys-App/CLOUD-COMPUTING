import { Router, Request, Response, NextFunction } from 'express'
import { authenticateUser } from '../middleware/auth.middleware'
import { AuthenticatedRequest, createProfile } from '@/controllers/profile.controller'

const profileRouter = Router()

profileRouter.post(
  '/profiles',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    createProfile(req, res, next)
  }
)

export default profileRouter
