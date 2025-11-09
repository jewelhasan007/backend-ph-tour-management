import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createZodSchema } from "./user.validation";
import { AnyZodObject } from "zod/v3";
import { validateRequest } from "../../middleware/validateRequest";
import AppError from "../../errorHelpers/AppErrors";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Role } from "./user.interface";
const router = Router()

router.post("/register", validateRequest(createZodSchema),UserControllers.createUser);
router.get("/all-users", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization
        if(!accessToken){
            throw new AppError(403, "No Token Received")
        }

        const verifiedToken = jwt.verify(accessToken, "secret")
        console.log(verifiedToken)

        // if(!verifiedToken){
        //      throw new AppError(403, `You are not authorized ${verifiedToken}`)
        // }
        if((verifiedToken as JwtPayload).role !== Role.ADMIN || Role.SUPER_ADMIN){
             throw new AppError(403, "You are not permitted to view this role!!!!")
        }
        next()

    } catch (error) {
        console.log("jwt error", error)
        next(error)
    }
}, UserControllers.getAllUsers)

export const UserRoutes = router
// export default router
