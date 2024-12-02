import { NextFunction, Request, Response, Router } from 'express'
import { loginUser, registerUser, resetPassword } from '../controllers/auth.controller'
import firebaseErrorHandler from '../middleware/firebaseErrorHandler'

const authRouter: Router = Router()

authRouter.post('/register', (req: Request, res: Response, next: NextFunction) => {
  registerUser(req, res, next)
})
authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
  loginUser(req, res, next)
})
authRouter.post(
  '/reset-password',
  (req: Request<{ email: string }>, res: Response, next: NextFunction) => {
    resetPassword(req, res, next)
  }
)
authRouter.use(firebaseErrorHandler)

export default authRouter
