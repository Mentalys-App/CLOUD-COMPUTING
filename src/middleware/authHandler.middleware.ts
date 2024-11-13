import { IAppError } from '@/types/error.type'
import { AppError } from '@/utils/AppError'
import { AuthError, AuthErrorCodes } from 'firebase/auth'

const handleAuthError = (error: unknown): IAppError => {
  if (!(error instanceof Error)) {
    return AppError('Terjadi kesalahan internal server', 500)
  }

  const authError = error as AuthError

  if (authError.code) {
    switch (authError.code) {
      case AuthErrorCodes.EMAIL_EXISTS:
      case 'auth/email-already-in-use':
        return AppError('Email sudah terdaftar', 409)

      case AuthErrorCodes.INVALID_EMAIL:
      case 'auth/invalid-email':
        return AppError('Format email tidak valid', 400)

      case AuthErrorCodes.WEAK_PASSWORD:
      case 'auth/weak-password':
        return AppError('Password terlalu lemah', 400)

      case AuthErrorCodes.USER_DELETED:
      case 'auth/user-not-found':
        return AppError('Email atau password salah', 401)

      case AuthErrorCodes.INVALID_PASSWORD:
      case 'auth/wrong-password':
        return AppError('Email atau password salah', 401)

      case AuthErrorCodes.INVALID_IDP_RESPONSE:
      case 'auth/invalid-credential':
        return AppError('Kredensial tidak valid', 401)

      default:
        return AppError(`Kesalahan autentikasi: ${authError.message || 'Terjadi kesalahan'}`, 500)
    }
  }

  return AppError('Terjadi kesalahan internal server', 500)
}

export default handleAuthError
