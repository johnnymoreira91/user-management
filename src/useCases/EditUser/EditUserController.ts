import { Request, Response } from 'express'
import { EditUserUseCase } from './EditUserUseCase'

class EditUserController {
  constructor (
    private editUserUseCase: EditUserUseCase
  ) {}

  async handle (req: Request<{id: string}, {}, {
    name: string, email: string, password: string, age: number,
    isGuest: boolean, active: boolean
  }>, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, password, age, isGuest, active } = req.body
    try {
      if (!id) {
        return res.status(400).json({
          message: 'Id cannot be null'
        })
      }
      const data = await this.editUserUseCase.execute({
        email: email,
        name: name,
        password: password,
        age: age,
        isGuest: isGuest || false,
        active: active || true
        // public_id: public_id
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { EditUserController }
