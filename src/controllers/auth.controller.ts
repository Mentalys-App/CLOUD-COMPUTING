import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/AppError'
import { AuthRequestBody } from '@/types/authRequest.type'
import { authService } from '@/services/auth.service'
import { registrationSchema } from '@/validations/auth.validation'
import { formatJoiError } from '@/utils/joiValidation'
import { collection, getDocs, query, where } from '@firebase/firestore'
import { auth, db } from '@/config/firebaseConfig'

export const registerUser = async (
  req: Request<AuthRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password } = req.body
  const { error } = registrationSchema.validate(req.body)

  if (error) {
    const validationError = formatJoiError(error)
    return res.status(400).json(validationError)
  }

  try {
    const userData = await authService.registerWithEmail(email, password)
    return res.status(201).json({
      status: 'success',
      message: 'Email verifikasi telah dikirim. Silakan periksa email Anda.',
      data: userData
    })
  } catch (error) {
    console.error(error)
    next(error)
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
    const user = auth.currentUser
    if (user && !user.emailVerified) {
      return res.status(403).json({
        status: 'fail',
        message: 'Email Anda belum terverifikasi. Silakan periksa email Anda.'
      })
    }

    return res.status(200).json({
      status: 'success',
      data: userData
    })
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (
  req: Request<{ email: string }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body

  if (!email) {
    return next(AppError('Email harus diisi', 400))
  }

  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      return res.status(404).json({
        status: 'fail',
        message: 'Email tidak terdaftar'
      })
    }
    await authService.sendPasswordReset(email)
    return res.status(200).json({
      status: 'success',
      message: 'Email pemulihan kata sandi telah dikirim.'
    })
  } catch (error) {
    next(error)
  }
}
