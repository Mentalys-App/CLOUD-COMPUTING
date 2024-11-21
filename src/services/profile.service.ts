import { db } from '@/config/firebase.config'
import { doc, setDoc } from 'firebase/firestore'
import { ProfileRequestBody } from '@/types/profile.type'

export const profileService = {
  async createProfile(uid: string, profileData: ProfileRequestBody) {
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
