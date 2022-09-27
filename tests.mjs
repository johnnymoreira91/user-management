// // console.log("%cHello World!", "background: #000; color: #FFF");
// var red, blue, reset;
// red = '\u001b[31m';
// blue = '\u001b[34m';
// reset = '\u001b[0m';

// console.log(red +"Aqui esta o texto em vermelho. "+ blue +"Aqui esta o texto em vermelho. "+ reset +"Aqui estamos dando reset nas cores do bash.")

// import dns from 'dns'

// // const w3 = dns.lookup('uol.com.br', function (_err, addresses, _family) {
// //   console.log(addresses)
// // })

// const options = {
//   family: 6,
//   hints: dns.ADDRCONFIG | dns.V4MAPPED
// }

// dns.lookup('aol.com', options, (_err, address, family) =>
//   console.log('address: %j family: IPv%s', address, family))

import net from 'net'

// const server = net.createServer((c) => {
//   // 'connection' listener.
//   console.log('client connected')
//   c.on('end', () => {
//     console.log('client disconnected')
//   })
//   c.write('hello\r\n')
//   c.pipe(c)
// })
// server.on('error', (err) => {
//   throw err
// })
// server.listen(8124, () => {
//   console.log('server bound')
// })

import https from 'https'
const hostname = 'www.aol.com'

setInterval(() => {
  let startRequest = new Date().getTime()
  const req = https.request({
    hostname: hostname
  }, function (res) {
    const pingTime = new Date().getTime() - startRequest
    console.log(`${res.statusCode} | ${hostname} | ${pingTime} | ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`)
  })
  req.on('error', (e) => {
    console.log('Erro: ' + e)
  })
  req.on('connect', (e) => {
    startRequest = new Date().getTime()
  })
  req.end()
}, 3000)
