import prismaErrorHandler from '@/middleware/prismaHandler.middleware'
import { IProfile } from '@/types/profile.type'
import prisma from '@/utils/client'
import { Profile } from '@prisma/client'

export const ProfileService = {
  async createProfile(profileData: IProfile): Promise<IProfile> {
    try {
      const profile = await prisma.profile.create({
        data: profileData
      })
      return {
        ...profile,
        profile_pic: profile.profile_pic ?? undefined
      }
    } catch (error) {
      if (prismaErrorHandler(error)) {
        throw prismaErrorHandler(error)
      }
      throw error
    }
  },
  async updateProfile(firebaseId: string, updateData: Partial<Profile>): Promise<IProfile> {
    try {
      const updatedProfile = await prisma.profile.update({
        where: { firebaseId },
        data: updateData
      })
      return {
        ...updatedProfile,
        profile_pic: updatedProfile.profile_pic ?? undefined
      }
    } catch (error) {
      if (prismaErrorHandler(error)) {
        throw prismaErrorHandler(error)
      }
      throw error
    }
  }
}
