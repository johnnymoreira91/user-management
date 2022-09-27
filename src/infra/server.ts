/* eslint-disable no-path-concat */
import express from 'express'
import morganMiddleware from './middlewares/morganMiddleware'
import userRoute from './routes/userRoute'
import adminRoute from './routes/adminRoute'
import authRoute from './routes/authRoute'
import { createServer } from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const httpServer = createServer(app)

app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.set('view engine', 'ejs')
app.set('views', './src/infra/views')

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/admin', adminRoute)

app.get('/', (_request, response) => {
  return response.render('initialPage')
})

export {
  httpServer
}
