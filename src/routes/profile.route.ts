import { Router, Request, Response, NextFunction } from 'express'
import { createProfile } from '../controllers/profile.controller'
import { authenticateUser } from '../middleware/auth.middleware'

const profileRouter: Router = Router()
export interface AuthenticatedRequest extends Request {
  user: {
    uid: string
  }
}

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
