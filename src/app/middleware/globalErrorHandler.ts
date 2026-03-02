import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppErrors";
import { error } from "console";

export const globalErrorHandler = (err:any, req: Request, res: Response, next: NextFunction )=>{

let statusCode = 500
let message = `something went wrong!!! ${err.message} `

// Duplicate Error
// duplicate Error
// cast error,
// 
const errorSources : any = [
//     {
//     path : "isDeleted",
//     message: "Cast Failure"
// }
]
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

else if (err.name === "ValidationError"){
statusCode = 400;
const errors = Object.values(err.errors);
// eslint-disable-next-line @typescript-eslint/no-explicit-any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
errors.forEach((errorObject: any) => errorSources.push({
    path: errorObject.path,
    message: errorObject.message
}))

message = err.message
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
    // err,
    // stack: err.stack
    stack: envVars.NODE_ENV === "development" ? err.stack : null
})
}