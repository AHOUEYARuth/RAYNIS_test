export interface Task {
  id: number
  title: string
  description: string
  longitude: string
  latitude: string
  status: string
}

export interface TaskPayload {
  title: string
  description: string
  longitude: string
  latitude: string
}