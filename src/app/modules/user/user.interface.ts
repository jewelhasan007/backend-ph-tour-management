import mongoose = require("mongoose");
import { Types } from "mongoose";

export enum Role{
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

// auth providers
/**
 * 
 * email, password
 * google authentication
 * 
 */
export interface IAuthProvider{
    provider : string;  //"Google", "Credential"
    providerId: string;
}
export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}
export interface IUser {
    name : string;
    email : string;
    password ?: string;
    phone ?: string;
    picture ?: string;
    address ?: string;
    isDeleted ?: string;
    isActive ?: isActive;
    isVarified ?: string;
    role : Role;
    auths: IAuthProvider[];
    booking ?: mongoose.Types.ObjectId[]
    guides ?: Types.ObjectId[]
}