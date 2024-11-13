import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/AppError'
import { AuthRequestBody } from '@/types/authReques.type'
import { authService } from '@/services/authService'
import handleAuthError from '@/middleware/authHandler.middleware'

export const registerUser = async (
  req: Request<AuthRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(AppError('Email dan password harus diisi', 400))
  }
  try {
    const userData = await authService.registerWithEmail(email, password)
    return res.status(201).json({
      status: 'success',
      data: userData
    })
  } catch (error) {
    return next(handleAuthError(error))
  }
}

export const loginUser = async (
  req: Request<AuthRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(AppError('Email dan password harus diisi', 400))
  }
  try {
    const userData = await authService.loginWithEmail(email, password)
    return res.status(200).json({
      status: 'success',
      data: userData
    })
  } catch (error) {
    return next(handleAuthError(error))
  }
}

export const googleLogin = async (
  req: Request<AuthRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { idToken } = req.body
  if (!idToken) {
    return next(AppError('Token ID Google diperlukan', 400))
  }
  try {
    const userData = await authService.loginWithGoogle(idToken)
    return res.status(200).json({
      status: 'success',
      data: userData
    })
  } catch (error) {
    return next(handleAuthError(error))
  }
}
