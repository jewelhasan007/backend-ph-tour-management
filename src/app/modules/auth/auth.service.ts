import AppError from "../../errorHelpers/AppErrors";
import { IUser } from "../user/user.interface"
import httpStatus from "http-status-codes"
import { User } from "../user/user.model";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

const credentialLogin = async (payload: Partial<IUser>) => {
const {email, password} = payload;
     const isUserExist = await User.findOne({email})

       if(!isUserExist){
           throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
          }

          const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)
          if(!isPasswordMatched){
             throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
          }
          // const {password, ...rest} = isUserExist
          
const jwtPayload = {
  userID : isUserExist._id,
  email: isUserExist.email,
  role: isUserExist.role
}
const accessToken = generateToken(payload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRE)


          return {
            accessToken
          }
}

// user -ogin - token(email, role, _id) - booking/ payment / booking/ payment cancel 


export const AuthServices = {
    credentialLogin
}