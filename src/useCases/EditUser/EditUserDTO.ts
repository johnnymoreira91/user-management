class IEditUserRequestDTO {
  id?: number
  name: string
  email: string
  password: string
  age: number
  // public_id: string
  isGuest: boolean
  active: boolean
}

export { IEditUserRequestDTO }
