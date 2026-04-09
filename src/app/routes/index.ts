import {Router} from "express"
// Make sure the file exists as './user.route.ts' or update the path if the file has a different name or extension
import  {UserRoutes}  from "../modules/user/user.route"
import path from "path"
import { AuthRoutes } from "../modules/auth/auth.route"
import { DivisionRoutes } from "../modules/division/division.route"
import { TourRoutes } from "../modules/tour/tour.route"

export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/division",
        route: DivisionRoutes
    },
    {
        path: "/tour",
        route: TourRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

export default router;