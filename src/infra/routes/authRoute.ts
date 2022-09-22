import { createUserController } from '@useCases/CreateUser'
import { loginController } from '@useCases/Login'
import { Router } from 'express'

const router = Router()

router.post('/login', (req, res) => {
  return loginController.handle(req, res)
})

router.post('/register', (req, res) => {
  return createUserController.handle(req, res)
})

export default router
