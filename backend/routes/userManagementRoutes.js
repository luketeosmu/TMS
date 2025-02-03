const express = require("express");
const router = express.Router();

const jwtMiddleware = require("../controller/jwtmiddleware");
const UserController = require("../controller/UserController");
const PermissionsController = require("../controller/PermissionsController");

router.get("/getUsers", jwtMiddleware.validateToken, PermissionsController.checkGroup('admin'), UserController.getUsers);
router.get("/getGroupsByUser", jwtMiddleware.validateToken, UserController.getGroupsByUser);
router.get("/getAllGroups", jwtMiddleware.validateToken, UserController.getAllGroups);
router.get("/getUsersWithGroups", jwtMiddleware.validateToken, UserController.getUsersWithGroups);
router.patch("/updateUser", jwtMiddleware.validateToken, PermissionsController.checkGroup('admin'), UserController.updateUser);
module.exports = router;