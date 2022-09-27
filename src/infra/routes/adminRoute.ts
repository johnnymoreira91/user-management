import { Router } from 'express'
import { createSchema } from '@infra/database/createTables'
import { io } from '@infra/server'

const router = Router()

router.get('/table', async (req, res) => {
  try {
    await createSchema()
    return res.status(201).send()
  } catch (error) {
    return error.message
  }
})

router.get('/teste', async (req, res) => {
  const teste = req.query.teste
  try {
    await io.emit('msg', JSON.stringify(teste))
    return res.status(201).json(teste)
  } catch (error) {
    return error.message
  }
})

export default router
