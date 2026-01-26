import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppErrors";

export const globalErrorHandler = (err:any, req: Request, res: Response, next: NextFunction )=>{

let statusCode = 500
let message = `something went wrong!!! ${err.message} `

// Duplicate Error
// duplicate Error
// cast error,
// 

if(err.code === 1100){
    console.log("Duplicate error", err.message);
    const duplicate = err.message.match(/"([^"]*)"/)
    console.log(duplicate);
    statusCode = 400;
    message = `${duplicate[1]} already exists!!`
} 
// CastError/ Object ID error
else if(err.name === "CastError"){
    statusCode = 400;
    message = "Invalid mongoDB ObjectID, Please provide a valid id"
}
else if(err instanceof AppError){
    statusCode = err.statusCode
    message = err.message
}
else if(err instanceof Error){
    statusCode = 500;
    message = err.message

}
res.status(statusCode).json({
    success: false,
    message: message,
    err,
    // stack: err.stack
    stack: envVars.NODE_ENV === "development" ? err.stack : null
})
}