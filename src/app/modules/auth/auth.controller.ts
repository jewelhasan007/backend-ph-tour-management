/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsysnc } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"
import AppError from "../../errorHelpers/AppErrors"
import { setAuthCookie } from "../../utils/setCookie"

const credentialLogin =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {
        //    const user = await UserServices.CreateUser(req.body) 
    // res.status(httpStatus.CREATED).json({
    //     message: "User created successfully",
    //     user
    // })

    const loginInfo = await AuthServices.credentialLogin(req.body)
    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    // res.cookie("refreshToken", loginInfo.refreshToken,{
    //     httpOnly: true,
    //     secure: false
    // })
    setAuthCookie(res, loginInfo)
    sendResponse(res, {
         success: true,
        statusCode: httpStatus.OK,
        message: "Login Successfully",
        data: loginInfo,
       
    })
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

    sendResponse(res, {
         success: true,
        statusCode: httpStatus.OK,
        message: "User Logged Out Successfully",
        data: null,
       
    })
})

export const AuthControllers = {
    credentialLogin,
    getNewAccessoken,
    logout
}