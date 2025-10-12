import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createZodSchema } from "./user.validation";
import { AnyZodObject } from "zod/v3";
import { validateRequest } from "../../middleware/validateRequest";



const router = Router()

router.post("/register", validateRequest(createZodSchema),UserControllers.createUser);
router.get("/all-users", UserControllers.getAllUsers)

export const UserRoutes = router
