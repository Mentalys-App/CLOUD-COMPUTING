import { IProfile } from '@/types/profile.type'
import prisma from '@/utils/client'

export const ProfileService = {
  async createProfile(profileData: IProfile): Promise<IProfile> {
    const profile = await prisma.profile.create({
      data: profileData
    })
    return {
      ...profile,
      profile_pic: profile.profile_pic ?? undefined
    }
  }
}
