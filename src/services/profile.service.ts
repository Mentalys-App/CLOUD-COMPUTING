import { IProfile } from '@/types/profile.type'
import prisma from '@/utils/client'
import { Profile } from '@prisma/client'

export const ProfileService = {
  async createProfile(profileData: IProfile): Promise<IProfile> {
    const profile = await prisma.profile.create({
      data: profileData
    })
    return {
      ...profile,
      profile_pic: profile.profile_pic ?? undefined
    }
  },
  async updateProfile(userId: string, updateData: Profile): Promise<IProfile> {
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: updateData
    })
    return {
      ...updatedProfile,
      profile_pic: updatedProfile.profile_pic ?? undefined
    }
  }
}
