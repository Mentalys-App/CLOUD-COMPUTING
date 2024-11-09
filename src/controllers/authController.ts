import { Request, Response, NextFunction } from 'express'
import { auth } from '../config/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  UserCredential
} from 'firebase/auth'
import { AppError } from '@/utils/AppError'
import { AuthRequestBody } from '@/types/authRequestTypes'
import handleAuthError from '@/middleware/authHandlerMiddleware'

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
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const idToken = await userCredential.user.getIdToken()

    return res.status(201).json({
      status: 'success',
      data: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        idToken
      }
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
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await userCredential.user.getIdToken()

    return res.status(200).json({
      status: 'success',
      data: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        idToken
      }
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
    const credential = GoogleAuthProvider.credential(idToken)
    const userCredential: UserCredential = await signInWithCredential(auth, credential)

    return res.status(200).json({
      status: 'success',
      data: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName
      }
    })
  } catch (error) {
    return next(handleAuthError(error))
  }
}
