import { Router } from 'express'
import { createSchema } from '@infra/database/createTables'

const router = Router()

router.get('/table', async (req, res) => {
  try {
    await createSchema()
    return res.status(201).send()
  } catch (error) {
    return error.message
  }
})

export default router
