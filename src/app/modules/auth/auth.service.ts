import AppError from "../../errorHelpers/AppErrors";
import { IUser } from "../user/user.interface"
import httpStatus from "http-status-codes"
import { User } from "../user/user.model";
import bcryptjs from 'bcryptjs'

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
}

export const AuthServices = {
    credentialLogin
}