import { httpServer } from '@infra/server'

const port = Number(process.env.PORT) || 3001

if (process.env.NODE_ENV === 'dev') {
  Connect(port, 'dev')
} else if (process.env.NODE_ENV === 'prod') {
  Connect(port, 'prod')
} else {
  Connect(port, 'NO_AMBIENT_DEFINED')
}

function Connect (port: number, stage: string) {
  httpServer.listen(port, () => {
    console.log(`Running on ${stage} process`)
  })
}
