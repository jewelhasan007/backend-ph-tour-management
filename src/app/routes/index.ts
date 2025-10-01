import {Router} from "express"
// Make sure the file exists as './user.route.ts' or update the path if the file has a different name or extension
import  {UserRoutes}  from "../modules/user/user.route"

const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    // {
    //     path: "/tour",
    //     route: TourRoutes
    // }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

export default router;