import express, { Router } from 'express';
import { SignUpController, getMyUsers } from '../controllers/AuthAdminController.js';
import { PostCo_Ordinates, userSignUp } from '../controllers/AuthUserController.js';
const AuthRouter=Router()
AuthRouter.post('/admin/signup',SignUpController)
AuthRouter.post('/user/signup',userSignUp)
AuthRouter.get('/admin/:id',getMyUsers)
AuthRouter.post('/user/cords/:id',PostCo_Ordinates)
export default AuthRouter