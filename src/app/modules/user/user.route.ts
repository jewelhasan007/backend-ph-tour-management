import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createZodSchema } from "./user.validation";
import { AnyZodObject } from "zod/v3";
import { validateRequest } from "../../middleware/validateRequest";
import AppError from "../../errorHelpers/AppErrors";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Role } from "./user.interface";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { checkAuth } from "../../middleware/checkAuth";
import { AuthControllers } from "../auth/auth.controller";
const router = Router()



router.post("/register", validateRequest(createZodSchema),UserControllers.createUser);
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN) , UserControllers.getAllUsers);
router.patch("/:id", checkAuth(...Object.values(Role)), UserControllers.updateUser)

export const UserRoutes = router
// export default router
