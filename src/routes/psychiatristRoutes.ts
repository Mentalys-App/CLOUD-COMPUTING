import express from 'express'
import { getPsychiatrists, addPsychiatrist } from '../controllers/psychiatristController'

const router = express.Router()

router.get('/psychiatrists', getPsychiatrists)
router.post('/psychiatrists', addPsychiatrist)

export default router
