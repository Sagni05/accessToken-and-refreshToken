const { Router } = require("express")
const { register, login, fetchUser, refreshToken } = require("../controller/controller")
const { validate, registerBody, loginBody } = require("../controller/rule")
const authentication = require("../authentication/auth")


const router = Router()

router.post("/register", validate(registerBody), register)
router.post("/login", validate(loginBody), login)
router.post("/refresh-token", refreshToken)
router.get("/users", authentication, fetchUser)


module.exports = router