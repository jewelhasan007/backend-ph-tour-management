import express, { NextFunction, Request } from "express";
import userRoute = require("./app/modules/user/user.route");
import cors from "cors"
import router from "./app/routes";
import { envVars } from "./app/config/env";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import httpStatus from "http-status-codes"
import { success } from "zod";
import notFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/api/v1", router)

app.get("/", (req: Request, res: Response)=>{
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    })
})

app.use(globalErrorHandler)
app.use(notFound)


module.exports = app;

