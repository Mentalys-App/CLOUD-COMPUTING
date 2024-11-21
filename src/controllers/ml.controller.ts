import { Request, Response, NextFunction } from 'express'
import { quizInputSchema, audioInputSchema } from '@/validations/ml.validation'
import { mlService } from '@/services/ml.service'
import { formatJoiError } from '@/utils/joiValidation'

export const handleQuizPrediction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = quizInputSchema.validate(req.body)
    if (error) {
      const validationError = formatJoiError(error)
      return res.status(400).json(validationError)
    }
    const inputData = req.body
    const prediction = await mlService.sendQuizPrediction(inputData)
    return res.status(200).json({
      status: 'success',
      prediction
    })
  } catch (error) {
    next(error)
  }
}

export const handleAudioPrediction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No audio file uploaded. Please send an audio file with key "audio"'
      })
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
      const validationError = formatJoiError(error)
      return res.status(400).json(validationError)
    }
    const prediction = await mlService.sendAudioPrediction(audioFile)
    return res.status(200).json({
      status: 'success',
      prediction
    })
  } catch (error) {
    next(error)
  }
}
