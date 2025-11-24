import AppError from "../../errorHelpers/AppErrors";
import { IsActive, IUser } from "../user/user.interface"
import httpStatus from "http-status-codes"
import { User } from "../user/user.model";
import bcryptjs from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";

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
          
// const jwtPayload = {
//   userID : isUserExist._id,
//   email: isUserExist.email,
//   role: isUserExist.role
// }
// const accessToken = generateToken(payload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRE)

// const refreshToken = generateToken(payload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)
// delete isUserExist.password;
const userTokens = createUserTokens(isUserExist)

const {password :  pass, ...rest} = isUserExist.toObject();

return {
            accessToken: userTokens.accessToken,
            refreshToken: userTokens.refreshToken,
            user: rest
          }
}

// user -ogin - token(email, role, _id) - booking/ payment / booking/ payment cancel 
const getNewAccessToken = async (refreshToken: string) => {
const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
return {
            accessToken: newAccessToken
            
          }
}

// user -ogin - token(email, role, _id) - booking/ payment / booking/ payment cancel 


export const AuthServices = {
    credentialLogin,
    getNewAccessToken,
}