import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import z from "zod";


const router = Router()

router.post("/register",async(req: Request, res: Response, next: NextFunction)=>{
const createZodSchema = z.object({
    name : z.string({invalid_type_error: "Name must be string"}).min(2, {message: "Name too short. Minimum 2 character"}).max(50, {message: "Name too long"}),
    email : z.string().email(),
    // 1 uppercase, 1 special character, 1 digit, 18 character min
    password ?: z.string().min(8)
    .regex(/^(?=.*[A-Z])/,{
        message: "Password must contain at least 1 uppercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*])/,{
        message: "Password must contain at least 1 special character",
    })
    .regex(/^(?=.*\d)/,{
        message: "Password must contain at least 1 number",
    }),
    phone ?: z.string({invalid_type_error: "Phone number must be string"})
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message:"Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        }).optional(),
    address ?: z.
    string({invalid_type_error: "Address must be string"})
    .max(200,{message: "Address cannot exceed 200 characters."})
    .optional(),
})
req.body = await createZodSchema.parseAsync(req.body)
console.log(req.body)
// next()
},
 UserControllers.createUser);
router.get("/all-users", UserControllers.getAllUsers)

export const UserRoutes = router
