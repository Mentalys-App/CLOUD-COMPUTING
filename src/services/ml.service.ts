import axios, { AxiosResponse } from 'axios'
import { QuizInputData, AudioInputData, PredictionResponse } from '@/types/ml.type'
import { MLConfig } from '@/config/ml.config'

export const mlService = {
  async sendQuizPrediction(inputData: QuizInputData): Promise<PredictionResponse> {
    const response: AxiosResponse<PredictionResponse> = await axios.post(
      MLConfig.QUIZ_MODEL_API_URL,
      inputData
    )
    return response.data
  },
  async sendAudioPrediction(audioData: AudioInputData): Promise<PredictionResponse> {
    const formData = new FormData()
    formData.append(
      'audio',
      new Blob([audioData.buffer], { type: audioData.mimetype }),
      audioData.originalname
    )

    const response: AxiosResponse<PredictionResponse> = await axios.post(
      MLConfig.AUDIO_MODEL_API_URL,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    return response.data
  }
}
