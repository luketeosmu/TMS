const express = require("express");
const router = express.Router();

const jwtMiddleware = require("../jwtmiddleware");
const UserController = require("../controller/UserController");
const PermissionsController = require("../controller/PermissionsController");

router.get("/getUsers", jwtMiddleware.validateToken, PermissionsController.checkGroup('admin'), UserController.getUsers);
router.get("/getGroupsByUser", jwtMiddleware.validateToken, UserController.getGroupsByUser);
module.exports = router;