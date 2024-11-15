import prisma from '@/utils/client'
import {
  profileValidationSchema,
  updateProfileValidationSchema
} from '@/validations/profile.validation'
import { Request, Response, NextFunction } from 'express'
import { ProfileService } from '../services/profile.service'
import { AppError } from '@/utils/AppError'
import { formatJoiError } from '@/utils/joiValidation'
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
      birth_date: new Date(req.body.birth_date),
      firebaseId: uid_firebase,
      username: req.body.username.trim(),
      full_name: req.body.full_name.trim(),
      location: req.body.location.trim()
    }

    const newProfile = await ProfileService.createProfile(profileData)
    return res.status(201).json({
      status: 'success',
      message: 'Profile created successfully',
      data: newProfile
    })
  } catch (error) {
    next(error)
  }
}
export const updateProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { error } = updateProfileValidationSchema.validate(req.body)
    if (error) {
      const validationError = formatJoiError(error)
      return res.status(400).json(validationError)
    }
    const uid_firebase = req.user?.uid
    if (!uid_firebase) {
      return next(AppError('unauthorized', 404))
    }
    const userProfile = await prisma.profile.findUnique({
      where: {
        firebaseId: uid_firebase
      }
    })
    if (!userProfile) {
      return next(AppError('User not found', 404))
    }
    const updatedData = {
      ...userProfile,
      username: req.body.username ? req.body.username.trim() : userProfile.username,
      profile_pic: req.body.profile_pic !== null ? userProfile.profile_pic : null,
      full_name: req.body.full_name ? req.body.full_name.trim() : userProfile.full_name,
      birth_date: isNaN(new Date(req.body.birth_date).getTime())
        ? userProfile.birth_date
        : new Date(req.body.birth_date),
      location: req.body.location ? req.body.location.trim() : userProfile.location,
      gender: req.body.gender ?? userProfile.gender
    }

    const updatedProfile = await ProfileService.updateProfile(uid_firebase, updatedData)
    return res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: updatedProfile
    })
  } catch (error) {
    next(error)
  }
}
