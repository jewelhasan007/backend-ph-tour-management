import { NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response, next:NextFunction) => Promise<void>
export const catchAsysnc = (fn: AsyncHandler) => (req: Request, res: Response, next:NextFunction) =>{
    Promise.resolve(fn(req, res, next)).catch((err: any) =>{
        console.log(err);
        next(err)
    })
}

