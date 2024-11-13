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
    return res.status(201).json({
      status: 'success',
      data: newProfile
    })
  } catch (error) {
    return next(prismaErrorHandler(error))
  }
}
export const updateProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const uid_firebase: string | undefined = req.user?.uid
    if (!uid_firebase) {
      return next(AppError('unauthorized', 404))
    }
    const user = await prisma.user.findUnique({
      where: {
        uid_firebase
      }
    })
    if (!user) {
      return next(AppError('User not found', 404))
    }
    const userId = user.id
    const currentProfile = await prisma.profile.findUnique({
      where: { userId }
    })
    if (!currentProfile) {
      return next(AppError('Profile not found', 404))
    }
    const updatedData = {
      ...currentProfile,
      username: req.body.username ?? currentProfile.username,
      profile_pic: req.body.profile_pic !== null ? currentProfile.profile_pic : null,
      full_name: req.body.full_name ?? currentProfile.full_name,
      birth_date: req.body.birth_date ?? currentProfile.birth_date,
      location: req.body.location ?? currentProfile.location,
      gender: req.body.gender ?? currentProfile.gender
    }
    const updatedProfile = await ProfileService.updateProfile(userId, updatedData)
    return res.status(200).json({
      status: 'success',
      data: updatedProfile
    })
  } catch (error) {
    next(prismaErrorHandler(error))
  }
}
