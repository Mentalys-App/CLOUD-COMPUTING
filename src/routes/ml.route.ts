import { Router, Request, Response, NextFunction } from 'express'
import axios, { AxiosError } from 'axios'
import { authenticateUser } from '../middleware/auth.middleware'
import { AppError } from '@/utils/AppError'
import { quizInputSchema, audioInputSchema } from '@/validations/ml.validation'
import multer from 'multer'

const mlRouter: Router = Router()

const QUIZ_MODEL_API_URL = 'https://tabular-ml-780354670120.us-central1.run.app/predict'

mlRouter.post(
  '/quiz',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = quizInputSchema.validate(req.body)
      if (error) {
        next(AppError('Validation Error', 400))
      }

      const inputData = req.body
      const response = await axios.post(QUIZ_MODEL_API_URL, inputData)
      res.status(200).json({
        status: 'success',
        data: response.data
      })
    } catch (error) {
      next(error)
    }
  }
)

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3']
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only audio files are allowed.'))
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // Batasi ukuran file 5MB
  }
})

const AUDIO_MODEL_API_URL =
  'https://audio-classification-780354670120.us-central1.run.app/api/predict'

// Route untuk model audio
mlRouter.post(
  '/audio',
  (req: Request, res: Response, next: NextFunction) => {
    authenticateUser(req, res, next)
  },
  upload.single('audio'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Cek apakah file ada
      if (!req.file) {
        res.status(400).json({
          status: 'error',
          message: 'No audio file uploaded. Please send an audio file with key "audio"'
        })
        res.end()
      }

      const audioFile = req.file as Express.Multer.File

      const { error } = audioInputSchema.validate({
        audio: {
          originalname: audioFile.originalname,
          mimetype: audioFile.mimetype,
          size: audioFile.size
        }
      })

      if (error) {
        res.status(400).json({
          status: 'error',
          message: `Validation Error: ${error.details[0].message}`
        })
        res.end()
      }

      // Buat form data untuk dikirim ke API
      console.log(audioFile)
      const formData = new FormData()
      formData.append(
        'audio',
        new Blob([audioFile.buffer], {
          type: audioFile.mimetype
        }),
        audioFile.originalname
      )
      try {
        // Kirim request ke model API
        const response = await axios.post(AUDIO_MODEL_API_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        // Kirim response
        res.status(200).json({
          status: 'success',
          data: response.data
        })
        res.end()
      } catch (apiError) {
        if (axios.isAxiosError(apiError)) {
          const axiosError = apiError as AxiosError
          console.error('API Error:', axiosError.response?.data)
          res.status(axiosError.response?.status || 500).json({
            status: 'error',
            message:
              axiosError.response?.data || 'Error communicating with audio classification API'
          })
          res.end()
        }
      }
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
)

export default mlRouter
