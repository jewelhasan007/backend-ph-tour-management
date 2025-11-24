import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppErrors"
import { verifyToken } from "../utils/jwt"
import { envVars } from "../config/env"
import { JwtPayload } from "jsonwebtoken"

export const checkAuth = (...authRoles : string[]) => async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const accessToken = req.headers.authorization
        if(!accessToken){
            throw new AppError(403, "No Token Received")
        }

        // const verifiedToken = jwt.verify(accessToken, "secret")
        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
  
        // if(!verifiedToken){
        //      throw new AppError(403, `You are not authorized ${verifiedToken}`)
        // }
        // authRoles = ["ADMIN", "SUPER-ADMIN"].includes("ADMIN")
        // if((verifiedToken as JwtPayload).role !== Role.ADMIN ){
        if(authRoles.includes(verifiedToken.role)){
             throw new AppError(403, "You are not permitted to view this role!!!!")
        }
        req.user = verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error)
        next(error)
    }
}