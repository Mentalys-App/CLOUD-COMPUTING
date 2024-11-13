export interface IProfile {
  userId: string
  username: string
  profile_pic?: string
  full_name: string
  birth_date: Date
  location: string
  gender: 'MALE' | 'FEMALE'
}
