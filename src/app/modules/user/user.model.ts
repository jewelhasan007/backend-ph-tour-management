import {Schema} from "mongoose"
import {IUser} from "./user.interface"
import Role = require("./user.interface")
import isActive = require("./user.interface")
import mini = require("zod/mini")
import type IAuthProvider = require("./user.interface")
import { model } from "mongoose"

const authProviderSchema = new Schema<IAuthProvider>({
    provider : {type: String, required: true},
    providerId: {type: String, required: true}
},{
    versionKey : false,
    _id: false
})

const userSchema = new Schema<IUser>({
    name : { type : String, required : true},
    email : {type : String, require : true, unique: true},
    password : {type : String},
    role: {
        type : String,
        enum : Object.values(Role),
        default: Role.USER
    },
    phone : {type : String},
    picture: {type: String},
    address: {type: String},
    isDeleted: {type : String},
    isActive : {
        type: String,
        enum : Object.values(isActive),
        default: isActive.isActive,
    },
    isVarified: {type: Boolean, default: false},
    auths : [authProviderSchema],
    },{
        timestamps : true,
        versionKey : false
    
})

export const User = model<IUser>("User", userSchema)