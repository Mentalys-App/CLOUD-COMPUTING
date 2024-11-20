import { db } from '@/config/firebaseConfig'
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { ProfileRequestBody } from '@/types/profile.type'
import { AppError } from '@/utils/AppError'

export const profileService = {
  async createProfile(uid: string, profileData: ProfileRequestBody) {
    const usernameQuery = query(
      collection(db, 'profiles'),
      where('username', '==', profileData.username)
    )
    const usernameSnapshot = await getDocs(usernameQuery)

    if (!usernameSnapshot.empty) {
      return AppError('Username already taken', 400)
    }
    const profileRef = doc(db, 'profiles', uid)
    const timestamp = new Date().toISOString()
    const data = {
      ...profileData,
      uid,
      created_at: timestamp,
      updated_at: timestamp
    }

    await setDoc(profileRef, data)

    return data
  }
}
