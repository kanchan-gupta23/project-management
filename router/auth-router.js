const express = require ("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const authmiddleware = require("../middelware/authmiddleware")
const validate = require("../middelware/validate")



router.route("/registration").post( authControllers.registration);
router.route("/login").post( authControllers.login);
router.route("/user").get(authmiddleware, authControllers.user);

// router.route("/logout").post( authmiddleware,authControllers.logout);


module.exports = router;

