const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')

// 🧑‍💻 @midudev: no entiendo porque me da este mensaje de error
// 🗒️ TypeError [Error]: Cannot destructure property 'port' of 'server.address(...)' as it is null.
function startServer () {
  const desiredPort = process.env.PORT ?? 1234
  const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (req.url === '/') {
      res.end('<h1>¡Hola mundo!</h1>')
    } else if (req.url === '/logo.webp') {
      fs.readFile('./logo.webp', (err, data) => {
        if (err) {
          res.statusCode = 500
          res.end('<h1>500 Internal Server Error</h1>')
        } else {
          res.setHeader('Content-Type', 'image/png')
          res.end(data)
        }
      })
    } else if (req.url === '/contacto') {
      res.end('<h1>Contacto</h1>')
    } else {
      res.statusCode = 404
      res.end('<h1>404</h1>')
    }
  }

  const server = http.createServer(processRequest)
  server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
  })

  return server
}

module.exports = {
  startServer
}
