import mongoose from "mongoose";
import { Server } from "http";
import app = require("./app");
import {envVars} from "./app/config/env"
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";


let server: Server;

const startServer =async () =>{
try {
  
    await mongoose.connect("mongodb+srv://L2_user:admin@cluster0.0frmz.mongodb.net/tour-db?retryWrites=true&w=majority&appName=Cluster0")
console.log("connected to DB!!")
server = app.listen(envVars.PORT, ()=>{
    console.log(`Server is listening to port ${envVars.PORT}`);
})
} catch (error) {
    console.log(error)
}
}

(async () => {
    await startServer()
    await seedSuperAdmin()
})()

// unhandled rejection error
process.on("unhandledRejection",(err)=>{
    console.log("unhandled Rejection detection.... Server shutting down..", err)
    if(server){
        server.close(()=>{ 
            process.exit(1)
        });
    }
    process.exit(1)
})
// uncaught rejection error
process.on("uncaughtException",(err)=>{
    console.log("uncaught Exception detection.... Server shutting down..", err)
    if(server){
        server.close(()=>{ 
            process.exit(1)
        });
    }
    process.exit(1)
})


// Total ERROR handle in Server
// -----------------------
// unhandled rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// uncaught rejection error
// throw new Error("I forgot to handle this local error")

// signal termination sigterm
