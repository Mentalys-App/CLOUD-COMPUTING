import { auth, db } from '@/config/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const authService = {
  async registerWithEmail(email: string, password: string) {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    await sendEmailVerification(userCredential.user)

    const uid = userCredential.user.uid
    const userRef = doc(db, 'users', uid)
    await setDoc(userRef, {
      uid_firebase: uid,
      email
    })
    return {
      uid,
      email: userCredential.user.email
    }
  },

  async loginWithEmail(email: string, password: string) {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await userCredential.user.getIdToken()
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      idToken
    }
  },
  async sendPasswordReset(email: string) {
    await sendPasswordResetEmail(auth, email)
  }
}
