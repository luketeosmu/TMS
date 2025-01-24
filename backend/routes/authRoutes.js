const express = require("express");
const router = express.Router();

const jwtMiddleware = require("../jwtmiddleware");
const AuthController = require("../controller/AuthController");

router.post("/login", AuthController.login);

router.post('/protected', jwtMiddleware.validateToken);

module.exports = router;