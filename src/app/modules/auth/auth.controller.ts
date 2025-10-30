/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsysnc } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"

const credentialLogin =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {
        //    const user = await UserServices.CreateUser(req.body) 
    // res.status(httpStatus.CREATED).json({
    //     message: "User created successfully",
    //     user
    // })

    const loginInfo = await AuthServices.credentialLogin(req.body)

    sendResponse(res, {
         success: true,
        statusCode: httpStatus.OK,
        message: "Login Successfully",
        data: loginInfo,
       
    })
})

export const AuthControllers = {
    credentialLogin
}