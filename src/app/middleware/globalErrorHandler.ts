import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppErrors";
import { error } from "console";
import path from "path";
import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interfaces/errorTypes";
import { handlDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handleValidationError } from "../helpers/handleValidationError";
import { handleZodError } from "../helpers/handleZodError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err:any, req: Request, res: Response, next: NextFunction )=>{
if(envVars.NODE_ENV === "development"){
    console.log(err)
}
let statusCode = 500
let message = `something went wrong!!! ${err.message} `

// Duplicate Error
// duplicate Error
// cast error,
// 
let errorSources : TErrorSources[] = [
//     {
//     path : "isDeleted",
//     message: "Cast Failure"
// }
]


if(err.code === 1100){
    console.log("Duplicate error", err.message);
 
    const simplifiedError = handlDuplicateError(err)

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message
} 
// CastError/ Object ID error
else if(err.name === "CastError"){
   const simplifiedError = handleCastError(err)
   statusCode = simplifiedError.statusCode;
   message = simplifiedError.message
}
else if(err.name === "ZodError"){
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
   errorSources = simplifiedError.errorSources
}
// mongoose validation error 
else if (err.name === "ValidationError"){
const simplifiedError = handleValidationError(err)
statusCode = simplifiedError.statusCode;
errorSources = simplifiedError.errorSources as TErrorSources;


message = simplifiedError.message
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
    errorSources,
    err : envVars.NODE_ENV === "development" ? err: null,
    // stack: err.stack
    stack: envVars.NODE_ENV === "development" ? err.stack : null
})
}