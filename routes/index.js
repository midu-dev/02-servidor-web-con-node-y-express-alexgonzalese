const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.end("<h1>¡Hola mundo!</h1>");
});

router.route("/logo.webp").get((req, res) => {
  res.sendFile(process.cwd() + "/assets/logo.webp");
});

router.route("/contacto").post((req, res) => {
  const { name, email, message } = req.body;

  const responseObject = { name, email, message };

  res.status(201).json(responseObject);
});

module.exports = router;
