import type { CheckIn, CheckInWithUser, GymClass, GymInfo, User } from './types'

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? ''

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Error ${res.status} al pedir ${path}`)
  }
  return res.json() as Promise<T>
}

export async function fetchGym(): Promise<GymInfo> {
  return getJson<GymInfo>('/gym')
}

export async function fetchUsers(): Promise<User[]> {
  return getJson<User[]>('/users')
}

export async function fetchCheckIns(): Promise<CheckIn[]> {
  return getJson<CheckIn[]>('/checkins')
}

export async function fetchClasses(): Promise<GymClass[]> {
  return getJson<GymClass[]>('/classes')
}

export async function fetchTvBoard(): Promise<{
  gym: GymInfo
  users: User[]
  checkIns: CheckInWithUser[]
  activeMembers: CheckInWithUser[]
  classes: GymClass[]
}> {
  const [gym, users, checkIns, classes] = await Promise.all([
    fetchGym(),
    fetchUsers(),
    fetchCheckIns(),
    fetchClasses(),
  ])

  const byId = new Map(users.map((u) => [u.id, u]))

  const withUsers: CheckInWithUser[] = checkIns
    .map((c) => {
      const user = byId.get(c.userId)
      if (!user) return null
      return { ...c, user }
    })
    .filter((c): c is CheckInWithUser => c !== null)
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())

  return {
    gym,
    users,
    checkIns: withUsers,
    activeMembers: withUsers.filter((c) => c.active),
    classes,
  }
}
