const express = require("express");
const router = express.Router();
const {  UsersController} = require("../controllers/users");

router.post("/register", UsersController.insert);
router.post("/login", UsersController.login);

module.exports = router;
