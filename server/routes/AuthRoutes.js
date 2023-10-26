import express, { Router } from 'express';
import { SignUpController, getMyUsers } from '../controllers/AuthAdminController.js';
import { userSignUp } from '../controllers/AuthUserController.js';
const AuthRouter=Router()
AuthRouter.post('/admin/signup',SignUpController)
AuthRouter.post('/user/signup',userSignUp)
AuthRouter.get('/admin/:id',getMyUsers)
export default AuthRouter