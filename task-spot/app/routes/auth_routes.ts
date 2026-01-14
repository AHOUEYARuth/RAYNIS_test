/* eslint-disable prettier/prettier */

import router from "@adonisjs/core/services/router"
const AuthController = ()=> import('#controllers/auth_controller')

export const AuthRoutes = () => {
    router.group(() => {
        router.post('/register', [AuthController, 'register'])
        router.post('/login', [AuthController, 'login'])
    }).prefix('/auth')
}