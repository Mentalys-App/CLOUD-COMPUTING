import { Request, Response } from 'express'
import { db } from '../config/firestore'

export const getPsychiatrists = async (req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await db.collection('psychiatrists').get()
    const psychiatrists = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.status(200).json(psychiatrists)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching psychiatrists', error })
  }
}

export const addPsychiatrist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, specialty, location, consultationFee } = req.body
    const newPsychiatrist = { name, specialty, location, consultationFee }
    const docRef = await db.collection('psychiatrists').add(newPsychiatrist)
    res.status(200).json({ message: 'Psychiatrist added successfully', id: docRef.id })
  } catch (error) {
    res.status(500).json({ message: 'Error adding psychiatrist', error })
  }
}
