/* eslint-disable no-path-concat */
import express from 'express'
import morganMiddleware from './middlewares/morganMiddleware'
import userRoute from './routes/userRoute'
import adminRoute from './routes/adminRoute'
import authRoute from './routes/authRoute'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.set('view engine', 'ejs')
app.set('views', './src/infra/views')

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/admin', adminRoute)

app.get('/', (request, response) => {
  // return response.json({ message: 'Welcame to SOLID nodejs API' })
  // return response.status(200).render('initialPage')
  return response.render('initialPage')
})

export default app
