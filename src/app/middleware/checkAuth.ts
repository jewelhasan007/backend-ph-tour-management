import { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/AppErrors"
import { verifyToken } from "../utils/jwt"
import { envVars } from "../config/env"
import { JwtPayload } from "jsonwebtoken"
import { User } from "../modules/user/user.model"
import httpStatus from "http-status-codes"
import { IsActive } from "../modules/user/user.interface"

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
        
           const isUserExist = await User.findOne({email: verifyToken.email})
        if(!isUserExist){
           throw new AppError(httpStatus.BAD_REQUEST, "User Doesn't exist")
          }
          if(isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE){
             throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
          }
          if(isUserExist.isDeleted){
             throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted")
          }

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