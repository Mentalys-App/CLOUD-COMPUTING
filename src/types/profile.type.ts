import { Gender } from '@prisma/client'

export interface IProfile {
  userId: string
  username: string
  profile_pic?: string | undefined
  full_name: string
  birth_date: Date
  location: string
  gender: Gender
}

export interface UpdateProfileData {
  username?: string
  profile_pic?: string | null
  full_name?: string
  birth_date?: Date | null
  location?: string
  gender?: Gender
}
