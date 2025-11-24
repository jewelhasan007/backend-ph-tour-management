/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsysnc } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"
import AppError from "../../errorHelpers/AppErrors"

const credentialLogin =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {
        //    const user = await UserServices.CreateUser(req.body) 
    // res.status(httpStatus.CREATED).json({
    //     message: "User created successfully",
    //     user
    // })

    const loginInfo = await AuthServices.credentialLogin(req.body)
    res.cookie("accessToken", loginInfo.accessToken, {
        httpOnly: true,
        secure: false
    })
    res.cookie("refreshToken", loginInfo.refreshToken,{
        httpOnly: true,
        secure: false
    })

    sendResponse(res, {
         success: true,
        statusCode: httpStatus.OK,
        message: "Login Successfully",
        data: loginInfo,
       
    })
})
const getNewAccessoken =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token received from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string) 

    sendResponse(res, {
         success: true,
        statusCode: httpStatus.OK,
        message: "Login Successfully",
        data: tokenInfo,
       
    })
})

export const AuthControllers = {
    credentialLogin,
    getNewAccessoken
}