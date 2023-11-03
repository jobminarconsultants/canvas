import  { Router } from 'express';
import { LoginController, SignUpController, getMyUsers } from '../controllers/AuthAdminController.js';
import {PostCoordinates, getCoordinatesByDateAndUser, getDataByDate, getIncident, getNotifications, getUserReports, get_cords, logout, notificationsController, postFormData, postIncident, postUserReport, post_cords, userSignUp } from '../controllers/AuthUserController.js';
const AuthRouter=Router()
// sign up controller for the adim
AuthRouter.post('/admin/signup',SignUpController)
// login controller for both user and admin
AuthRouter.post('/admin/login',LoginController)
// signup controller for user
AuthRouter.post('/user/signup',userSignUp)
// AuthRouter.post('user/login',userLoginController)
// post the form of canvasing
AuthRouter.post('/user/form/:id',postFormData)
// get the canvasing form by date
AuthRouter.get('/user/form/:id/:date',getDataByDate)
// post the reports while canvasing
AuthRouter.post('/user/reports/:id',postUserReport)
// get the reports of canvasing 
AuthRouter.get('/user/reports/:id',getUserReports)
// get all the users of admin
AuthRouter.get('/admin/:id',getMyUsers)
// post the co ordinates
AuthRouter.post('/user/cords/:id',PostCoordinates)
AuthRouter.get('/user/cords/:id/:date', getCoordinatesByDateAndUser);
AuthRouter.post('/admin/notifiactions/:id',notificationsController)
AuthRouter.get('/admin/notifications/:id',getNotifications)
// AuthRouter.post('/status/:id',postStatus)
AuthRouter.post('/logout/:id',logout)
AuthRouter.post('/incidents/:id',postIncident);
AuthRouter.get('/incidents/:id',getIncident)
AuthRouter.post('/cord-set',post_cords)
AuthRouter.get('/cord-set',get_cords)
export default AuthRouter

