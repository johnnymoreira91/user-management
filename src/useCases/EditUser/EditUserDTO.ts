class IEditUserRequestDTO {
  id?: number
  name: string
  email: string
  password: string
  age: number
  permission: number
  isGuest: boolean
  active: boolean
}

export { IEditUserRequestDTO }
