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
const resetPassword = async (oldPassword : string, newPassword: string, decodedToken : JwtPayload) => {

    if (!decodedToken || !decodedToken.userID) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
  
const user = await User.findById(decodedToken.userID)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
  if(!isOldPasswordMatch){
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password doesn't match")
  }

user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))
user!.save()


}

// user -ogin - token(email, role, _id) - booking/ payment / booking/ payment cancel 


export const AuthServices = {
    credentialLogin,
    getNewAccessToken,
    resetPassword
}