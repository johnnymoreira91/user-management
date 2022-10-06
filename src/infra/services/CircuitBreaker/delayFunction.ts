import https from 'https'
const hostname = 'www.uol.com.br'

const baseline = 20
let delay = baseline
let timeErrorOcurred = null
function delayedFunction () {
  return new Promise((resolve, reject) => {
    if (timeErrorOcurred) {
      var millisecondsPassed = new Date().getTime() - timeErrorOcurred
      if (millisecondsPassed > 5000) {
        delay = baseline
        timeErrorOcurred = null
      }
    }
    if (delay > 13) {
      timeErrorOcurred = new Date().getTime()
      return reject(new Error('Service failing'))
    }

    let startRequest = new Date().getTime()
    const req = https.request({
      hostname: hostname
    }, function (res) {
      // const pingTime = new Date().getTime() - startRequest
    })
    req.on('error', (e) => {
      console.log('Erro: ' + e)
    })
    req.on('connect', (e) => {
      startRequest = new Date().getTime()
    })
    req.end()

    const msg = `Service is responding in ${delay} ms`
    console.log(msg)
    resolve(msg)
    delay = new Date().getTime() - startRequest
  })
}

export { delayedFunction }
