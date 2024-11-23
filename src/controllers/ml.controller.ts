import { Response, NextFunction } from 'express'
import {
  quizInputSchema,
  audioInputSchema,
  handwritingInputSchema
} from '../validations/ml.validation'
import { mlService } from '../services/ml.service'
import { formatJoiError } from '../utils/joiValidation'
import { AuthenticatedRequest } from '../types/AuthenticatedRequest.type'
import { MLHistoryQuery, MLRequestType } from '../types/ml.type'

export const handleQuizPrediction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = quizInputSchema.validate(req.body)
    if (error) {
      const validationError = formatJoiError(error)
      return res.status(400).json(validationError)
    }
    const inputData = req.body
    const uid = req.user.uid
    const prediction = await mlService.sendQuizPrediction(uid, inputData)
    return res.status(200).json({
      status: 'success',
      prediction
    })
  } catch (error) {
    next(error)
  }
}

export const handleAudioPrediction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
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
    const uid = req.user.uid
    const prediction = await mlService.sendAudioPrediction(uid, audioFile)
    return res.status(200).json({
      status: 'success',
      prediction
    })
  } catch (error) {
    next(error)
  }
}

export const handleHandwritingPrediction = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No image file uploaded. Please send an image file with key "file"' // Updated error message
      })
    }
    const imageFile = req.file as Express.Multer.File
    const { error } = handwritingInputSchema.validate({
      file: {
        originalname: imageFile.originalname,
        mimetype: imageFile.mimetype,
        size: imageFile.size
      }
    })
    if (error) {
      const validationError = formatJoiError(error)
      return res.status(400).json(validationError)
    }
    const uid = req.user.uid
    const prediction = await mlService.sendHandwritingPrediction(uid, imageFile)
    return res.status(200).json({
      status: 'success',
      prediction
    })
  } catch (error) {
    next(error)
  }
}

export const getMLRequestHistory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.user.uid
    const { type, page, limit, startDate, endDate, sortBy, sortOrder } = req.query

    if (!Object.values(MLRequestType).includes(type as MLRequestType)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid ML request type'
      })
    }

    const queryOptions: MLHistoryQuery = {
      type: type as MLRequestType,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      startDate: startDate as string,
      endDate: endDate as string,
      sortBy: sortBy as 'timestamp' | 'prediction',
      sortOrder: sortOrder as 'asc' | 'desc'
    }

    const history = await mlService.getMLRequestHistory(uid, queryOptions)
    return res.status(200).json({
      status: 'success',
      ...history
    })
  } catch (error) {
    next(error)
  }
}
