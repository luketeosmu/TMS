const express = require("express");
const router = express.Router();

const jwtMiddleware = require("../controller/jwtmiddleware");
const AuthController = require("../controller/AuthController");

router.post("/login", AuthController.login);

router.post('/protected', jwtMiddleware.validateToken, (req, res) => {
    res.status(200).json({
        success: true,
        
    })
});

module.exports = router;