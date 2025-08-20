import type Request = require("express");
import type Response = require("express");
import type e = require("express");
import {User} from "./user.model"
import httpStatus from "http-status-codes"

const createUser = (req: Request, res: Response) =>{
try {
    const{name, email} =  req.body;
    const user = User.create({
        name,
        email,

    })
    res.status(httpStatus.CREATED).json({
        message: "User created successfully",
        user
    })
    
} catch (err: any) {
    console.log(err);
    res.status(httpStatus.BAD_REQUEST).json({
        message: `something went wrong!!! ${err.message}`
    })
}
}

export const UserControllers ={
    createUser
}