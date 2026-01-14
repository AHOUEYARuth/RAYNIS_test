export interface User {
  id: number
  email: string
  name: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  last_name: string
  first_name: string
  email: string
  password: string
}
