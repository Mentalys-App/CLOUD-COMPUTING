import prisma from '@/utils/client'
import { profileValidationSchema } from '@/validations/profile.validation'
import { Request, Response, NextFunction } from 'express'
import { ProfileService } from '../services/profile.service'
import { AppError } from '@/utils/AppError'
import { formatJoiError } from '@/utils/joiValidation'
import prismaErrorHandler from '@/middleware/prismaHandler.middleware'
export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string
  }
}

export const createProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { error } = profileValidationSchema.validate(req.body)
    if (error) {
      const validationError = formatJoiError(error)
      return res.status(400).json(validationError)
    }
    const uid_firebase = req.user?.uid
    const user = await prisma.user.findUnique({
      where: {
        uid_firebase
      }
    })
    if (!user) {
      return next(AppError('User not found', 404))
    }
    const profileData = {
      ...req.body,
      userId: user.id
    }
    const newProfile = await ProfileService.createProfile(profileData)
    return res.status(201).json(newProfile)
  } catch (error) {
    return next(prismaErrorHandler(error))
  }
}
