import express from "express";
import userRoute = require("./app/modules/user/user.route");
import cors from "cors"


const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/v1/user", userRoute.UserRoutes)

app.get("/", (req: Request, res: Response)=>{
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    })
})

module.exports = app;

