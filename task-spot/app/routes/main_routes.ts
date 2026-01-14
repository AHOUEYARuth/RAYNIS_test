/* eslint-disable prettier/prettier */

import router from "@adonisjs/core/services/router";
import { AuthRoutes } from "./auth_routes.js";
import { TaskRoutes } from "./task_routes.js";

router.group(() => {
    AuthRoutes(),
    TaskRoutes()
}).prefix('/api')
