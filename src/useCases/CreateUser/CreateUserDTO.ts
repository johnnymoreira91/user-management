class ICreateUserRequestDTO {
  name: string
  email: string
  password: string
  age: number
  public_id?: string
  permission: number
  isGuest: boolean
  active: boolean
}

export { ICreateUserRequestDTO }
