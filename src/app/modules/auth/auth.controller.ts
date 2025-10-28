import { NextFunction, Request, Response } from "express"
import { catchAsysnc } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"

const credentialLogin =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {
        //    const user = await UserServices.CreateUser(req.body) 
    // res.status(httpStatus.CREATED).json({
    //     message: "User created successfully",
    //     user
    // })
    sendResponse(res, {
         success: true,
        statusCode: httpStatus.OK,
        message: "Login Successfully",
        data: user,

       
    })
})

export const AuthControllers = {
    credentialLogin
}