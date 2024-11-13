import { NextFunction, Request, Response, Router } from 'express'
import { googleLogin, loginUser, registerUser } from '../controllers/auth.controller'

const authRouter: Router = Router()

authRouter.post('/register', (req: Request, res: Response, next: NextFunction) => {
  registerUser(req, res, next)
})
authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
  loginUser(req, res, next)
})
authRouter.post('/google', (req: Request, res: Response, next: NextFunction) => {
  googleLogin(req, res, next)
})
export default authRouter
