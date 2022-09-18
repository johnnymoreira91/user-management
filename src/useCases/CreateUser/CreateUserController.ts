import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  constructor (
    private createUserUseCase: CreateUserUseCase
  ) {}

  async handle (req: Request<{}, {}, {
    name: string, email: string, password: string, age: number, active: boolean, isGuest: boolean
  }>, res: Response): Promise<Response> {
    const { name, email, password, age, active, isGuest } = req.body
    try {
      if (!name || !email || !password) {
        return res.status(400).json({
          error: 'Params is missing'
        })
      }
      const data = await this.createUserUseCase.execute({
        name,
        email,
        password,
        age,
        active: active || true,
        isGuest: isGuest || false
      })

      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { CreateUserController }
