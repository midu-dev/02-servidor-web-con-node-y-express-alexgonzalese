const http = require("node:http"); // protocolo HTTP
const fs = require("node:fs");


const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/":
          res.end("<h1>¡Hola mundo!</h1>");
          break;
        case "/logo.webp":
          fs.readFile("./assets/logo.webp", (err, data) => {
            if (err) {
              res.statusCode = 500;
              res.end("<h1>500 Internal Server Error</h1>");
            } else {
              res.setHeader("Content-Type", "image/webp");
              res.end(data);
            }
          });
          break;
        case "/404":
          res.statusCode = 404;
          res.end("<h1>404</h1>");
          break;
        default:
          res.statusCode = 404;
          res.end("<h1>404</h1>");
          break;
      }
      break;
    case "POST":
      switch (url) {
        case "/contacto": {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const { name, email, message } = JSON.parse(body);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                name,
                email,
                message,
              })
            );
          });
          break;
        }

        default:
          res.statusCode = 405;
          res.end("<h1>405</h1>");
          break;
      }
      break;
    default:
      res.statusCode = 405;
      res.end("<h1>405</h1>");
      break;
  }
};


const desiredPort = process.env.PORT ?? 1234;
function startServer() {
  const server = http.createServer(processRequest);
  server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}/`);
  });

  return server;
}

module.exports = {
  startServer,
};
