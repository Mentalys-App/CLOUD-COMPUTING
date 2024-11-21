import { Router, Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest, createProfile } from '../controllers/profile.controller'
import { authenticateUser } from '../middleware/auth.middleware'

const profileRouter: Router = Router()

profileRouter.post(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  (req: Request, res: Response, next: NextFunction) => {
    createProfile(req as AuthenticatedRequest, res, next)
  }
)

export default profileRouter
