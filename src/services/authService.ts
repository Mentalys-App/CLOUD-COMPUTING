import { auth } from '@/config/firebaseConfig'
import prisma from '@/utils/client'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential
} from 'firebase/auth'

export const authService = {
  async registerWithEmail(email: string, password: string) {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const uid = userCredential.user.uid
    const idToken = await userCredential.user.getIdToken()
    await prisma.user.create({
      data: {
        uid_firebase: uid,
        email: email
      }
    })
    return {
      uid,
      email: userCredential.user.email,
      idToken
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

  async loginWithGoogle(idToken: string) {
    const credential = GoogleAuthProvider.credential(idToken)
    const userCredential: UserCredential = await signInWithCredential(auth, credential)
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName
    }
  }
}
