/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsysnc } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"
import AppError from "../../errorHelpers/AppErrors"
import { setAuthCookie } from "../../utils/setCookie"
import { createUserTokens } from "../../utils/userTokens"
import { envVars } from "../../config/env"
import passport from "passport"

const credentialLogin =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {
        //    const user = await UserServices.CreateUser(req.body) 
    // res.status(httpStatus.CREATED).json({
    //     message: "User created successfully",
    //     user
    // })
passport.authenticate("local", async(err: any, user:any, info) => {
if(err){
    // return next(err)
    // return new AppError(401, err)
    // return (err)
    throw new AppError(401, "Some error")
}

if(!user){
    return new AppError(401, info.message)
}

const userTokens = await createUserTokens(user)
// delete user.toObject().password
const {password: pass, ...rest} = user.toObject()

     setAuthCookie(res, userTokens)
    sendResponse(res, {
         success: true,
        statusCode: httpStatus.OK,
        message: "Login Successfully",
        data: {
            accessToken: userTokens.accessToken,
            refreshToken: userTokens.refreshToken,
            user:  rest
        },
       
    })

})(res, req, next)

    // const loginInfo = await AuthServices.credentialLogin(req.body)
    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    // res.cookie("refreshToken", loginInfo.refreshToken,{
    //     httpOnly: true,
    //     secure: false
    // })
   
})
const getNewAccessoken =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {
    const refreshToken = await req.cookies.refreshToken;

    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token received from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string) 

    //    res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

setAuthCookie(res, tokenInfo)
    sendResponse(res, {
         success: true,
        statusCode: httpStatus.OK,
        message: "New Access token created Successfully",
        data: tokenInfo,
       
    })
})
const logout =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {

res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
})
res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
})

    sendResponse(res, {
         success: true,
        statusCode: httpStatus.OK,
        message: "User Logged Out Successfully",
        data: null,
       
    })
})
const resetPassword =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {

const newPassword = req.body.newPassword;
const oldPassword = req.body.oldPassword;
const decodedToken = req.user


await AuthServices.resetPassword(oldPassword, newPassword, decodedToken)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password changed Successfully",
        data: null,
       
    })
})
const googleCallbackController =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {

let redirectTo = req.query.state ? req.query.state as string : ""  
if(redirectTo.startsWith("/")){
    redirectTo = redirectTo.slice()
}
const user = req.user;
console.log("google user",user)
if(!user){
    throw new AppError(httpStatus.NOT_FOUND, "User not Found")
}

const tokenInfo = createUserTokens(user)
setAuthCookie(res, tokenInfo)

    // sendResponse(res, {
    // success: true,
    // statusCode: httpStatus.OK,
    // message: "Password changed Successfully",
    // data: null,    
    // })
    // res.redirect(envVars.FRONTEND_URL)
     res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})

export const AuthControllers = {
    credentialLogin,
    getNewAccessoken,
    logout,
    resetPassword,
    googleCallbackController
}