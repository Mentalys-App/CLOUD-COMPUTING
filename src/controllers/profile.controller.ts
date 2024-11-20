import { Request, Response, NextFunction } from 'express'
import { ProfileRequestBody } from '@/types/profile.type'
import { profileService } from '@/services/profile.service'
import { profileValidationSchema } from '@/validations/profile.validation'
import { formatJoiError } from '@/utils/joiValidation'

export interface AuthenticatedRequest extends Request {
  user: {
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

    const uid = req.user.uid
    const profileData: ProfileRequestBody = req.body

    const createdProfile = await profileService.createProfile(uid, profileData)

    return res.status(201).json({
      status: 'success',
      data: createdProfile
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
