import { Router, Request, Response, NextFunction } from 'express'
import { createProfile, getProfile, updateProfile } from '../controllers/profile.controller'
import { authenticateUser } from '../middleware/auth.middleware'
import { AuthenticatedRequest } from '../types/AuthenticatedRequest.type'
import { uploadProfileImage } from '../utils/uploadProfile'

const profileRouter: Router = Router()

profileRouter.post(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  uploadProfileImage,
  (req: Request, res: Response, next: NextFunction) => {
    createProfile(req as AuthenticatedRequest, res, next)
  }
)

profileRouter.put(
  '/update',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  uploadProfileImage,
  (req: Request, res: Response, next: NextFunction) => {
    updateProfile(req as AuthenticatedRequest, res, next)
  }
)

profileRouter.get(
  '/profile',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  (req: Request, res: Response, next: NextFunction) => {
    getProfile(req as AuthenticatedRequest, res, next)
  }
)

export default profileRouter
