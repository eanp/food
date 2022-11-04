const express = require("express");
const router = express.Router();
const {  UsersController} = require("../controllers/users");
const {role} = require('../middlewares/auth')
router.post("/register/:role", role, UsersController.insert);
router.post("/login", UsersController.login);
router.post("/verif", UsersController.otp);

module.exports = router;
