const express = require('express');
const User = require('./model/User');
const AuthController = require('./controller/AuthController');
const router = express.Router();

const cors = require("cors");
// app.use(cors());
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
router.post('/signUp', cors(corsOptions), (req, res) => {
    const {username, password, email} = req.body;
    if(username && password && email) {
        const user = new User(username, password, email);
        try {
            AuthController.createUser(username, password, email);
            res.status(201).json({
                success: true,
                message: "User successfully created",
                data: user
            });
            // res.redirect('/home');
        } catch(error) {
            res.status(400).json({
                success: false,
                message: "Failed to create user"
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: "Failed to create user"
        });
    }
});

module.exports = router;