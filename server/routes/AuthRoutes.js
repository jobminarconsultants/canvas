import express, { Router } from 'express';
import { LoginController, SignUpController, getMyUsers } from '../controllers/AuthAdminController.js';
import {PostCoordinates, userLoginController, userSignUp } from '../controllers/AuthUserController.js';
const AuthRouter=Router()
AuthRouter.post('/admin/signup',SignUpController)
AuthRouter.post('/admin/login',LoginController)
AuthRouter.post('/user/signup',userSignUp)
AuthRouter.post('user/login',userLoginController)
AuthRouter.get('/admin/:id',getMyUsers)
AuthRouter.post('/user/cords/:id',PostCoordinates)
export default AuthRouter