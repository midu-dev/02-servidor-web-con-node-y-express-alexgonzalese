const express = require("express");
const boom = require("@hapi/boom");
const v1Router = require("./routes");
// Ejercicio 2: crear servidor HTTP con Express
const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use("/assets", express.static("public"));
app.use("", v1Router);

app.use((req, res, next) => {
  if (req.method === "GET") {
    res.status(404).send("<h1>404</h1>");
  } else {
    next();
  }
});

app.use((req, res) => {
  res.status(405).send("<h1>405</h1>");
});

function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`server express listening on port http://localhost:${PORT}/`);
  });
  return server;
}

module.exports = {
  startServer,
};
