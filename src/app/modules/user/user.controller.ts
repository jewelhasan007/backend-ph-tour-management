import type Request = require("express");
import type Response = require("express");
import type e = require("express");
import {User} from "./user.model"
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/AppErrors";
import httpStatus from "http-status-codes"
import { catchAsysnc } from "../../utils/catchAsync";
import { success } from "zod";
import { sendResponse } from "../../utils/sendResponse";

// const createUserFunction = () =>{
    //    const user = await UserServices.CreateUser(req.body)
   
    // res.status(httpStatus.CREATED).json({
    //     message: "User created successfully",
    //     user
    // })
    
// }



// const createUser = async (req: Request, res: Response, next:NextFunction) =>{
// try {
//     // throw new Error("Fake Error")
//     // throw new AppError(httpStatus.BAD_REQUEST, "fake error")
// createUserFunction()
// } catch (err: any){
//     console.log(err);
//     next(err)
//     // res.status(httpStatus.BAD_REQUEST).json({
//     //     message: `something went wrong!!! ${err.message} from userController` 
//     // })
// }
// }
const createUser =  catchAsysnc(async(req: Request, res: Response, next: NextFunction)=> {
           const user = await UserServices.CreateUser(req.body) 
    // res.status(httpStatus.CREATED).json({
    //     message: "User created successfully",
    //     user
    // })
    sendResponse(res, {
         success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,

       
    })
})
const getAllUsers = catchAsysnc(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await UserServices.getAllUsers();
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All users Retrieved Successfully",
    //     data : users
    // })

        sendResponse(res, {
         success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users retrived Successfully",
        data: result.data,
        meta: result.meta

       
    })
})

// function => req-res function
// function => try-catch => req-res function

export const UserControllers = {
    createUser, 
    getAllUsers
};


// route matching -> controller-> service -> model -> DB
// controller only server request and response ke handle korche. nothing else.
