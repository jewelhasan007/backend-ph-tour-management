import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppErrors";
import { IsActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";
import httpStatus from "http-status-codes"

export const createUserTokens = (user: Partial<IUser>) =>{
    const jwtPayload = {
      userID : user._id?.toString(),
      email: user.email,
      role: user.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRE)
    
    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)
    // delete isUserExist.password;
 
    
    return{
        accessToken,
        refreshToken
    }

}

export const createNewAccessTokenWithRefreshToken = async (refreshToken: string): Promise<string> => {
  const veryfiedRefreshToken =  verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload
     const isUserExist = await User.findOne({email: veryfiedRefreshToken.email})

       if(!isUserExist){
           throw new AppError(httpStatus.BAD_REQUEST, "User Doesn't exist")
          }
          if(isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE){
             throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
          }
          if(isUserExist.isDeleted){
             throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted")
          }

const jwtPayload = {
  userID : isUserExist._id.toString(),
  email: isUserExist.email,
  role: isUserExist.role
}
const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRE)

return accessToken;
}