export interface ProfileRequestBody {
  username: string
  profile_pic?: string
  full_name: string
  birth_date: string
  location: string
  gender: 'MALE' | 'FEMALE'
}
