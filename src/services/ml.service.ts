import axios, { AxiosResponse } from 'axios'
import { QuizInputData, AudioInputData, PredictionResponse } from '@/types/ml.type'
import { MLConfig } from '@/config/ml.config'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/config/firebase.config'

export const mlService = {
  async sendQuizPrediction(uid: string, inputData: QuizInputData): Promise<PredictionResponse> {
    const response: AxiosResponse<PredictionResponse> = await axios.post(
      MLConfig.QUIZ_MODEL_API_URL,
      inputData
    )
    const userPredictionsRef = collection(db, `user_predictions/${uid}/quiz_requests`)
    await setDoc(doc(userPredictionsRef), {
      inputData,
      prediction: response.data,
      timestamp: new Date().toISOString()
    })

    return response.data
  },
  async sendAudioPrediction(uid: string, audioData: AudioInputData): Promise<PredictionResponse> {
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
    const userPredictionsRef = collection(db, `user_predictions/${uid}/audio_requests`)
    await setDoc(doc(userPredictionsRef), {
      prediction: response.data,
      timestamp: new Date().toISOString()
    })

    return response.data
  },
  async sendHandwritingPrediction(
    uid: string,
    imageFile: Express.Multer.File
  ): Promise<PredictionResponse> {
    const formData = new FormData()
    formData.append(
      'file',
      new Blob([imageFile.buffer], { type: imageFile.mimetype }),
      imageFile.originalname
    )
    const response: AxiosResponse<PredictionResponse> = await axios.post(
      MLConfig.HANDWRITING_MODEL_API_URL,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    const userPredictionsRef = collection(db, `user_predictions/${uid}/handwriting_requests`)
    await setDoc(doc(userPredictionsRef), {
      prediction: response.data,
      timestamp: new Date().toISOString(),
      filename: imageFile.originalname
    })

    return response.data
  }
}
