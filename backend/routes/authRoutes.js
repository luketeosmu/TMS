const express = require("express");
const User = require("../model/User");
const AuthController = require("../controller/AuthController");
const router = express.Router();

// router.post("/signUp", (req, res) => {
//     const { username, password, email } = req.body;
//     if (username && password && email) {
//         const user = new User(username, password, email);
//         try {
//             AuthController.createUser(username, password, email);
//             res.status(201).json({
//                 success: true,
//                 message: "User successfully created",
//                 data: user,
//             });
//             // res.redirect('/home');
//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 message: "Failed to create user",
//             });
//         }
//     } else {
//         res.status(400).json({
//             success: false,
//             message: "Failed to create user",
//         });
//     }
// });

router.post("/login", AuthController.login);

router.post('/protected', AuthController.protected);

module.exports = router;
