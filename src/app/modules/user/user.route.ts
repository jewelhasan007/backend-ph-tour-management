import {Router} from "express"
import userController = require("./user.controller")

const router = Router()

router.post("/register", userController.UserControllers.createUser)

export const UserRoutes = router