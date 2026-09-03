export type GymInfo = {
  id: string
  name: string
  tagline: string
  location: string
}

export type User = {
  id: string
  name: string
  avatar: string | null
  plan: string
  memberSince: string
}

export type CheckIn = {
  id: string
  userId: string
  at: string
  active: boolean
}

export type GymClass = {
  id: string
  name: string
  coach: string
  startsAt: string
  endsAt: string
  room: string
}

export type CheckInWithUser = CheckIn & {
  user: User
}
