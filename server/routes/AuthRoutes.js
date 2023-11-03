import  { Router } from 'express';
import { LoginController, SignUpController, getMyUsers } from '../controllers/AuthAdminController.js';
import {PostCoordinates, getCoordinatesByDateAndUser, getDataByDate, getIncident, getNotifications, getUserReports, get_cords, logout, notificationsController, postFormData, postIncident, postUserReport, post_cords, userSignUp } from '../controllers/AuthUserController.js';
const AuthRouter=Router()
AuthRouter.post('/admin/signup',SignUpController)
AuthRouter.post('/admin/login',LoginController)
AuthRouter.post('/user/signup',userSignUp)
// AuthRouter.post('user/login',userLoginController)
AuthRouter.post('/user/form/:id',postFormData)
AuthRouter.get('/user/form/:id/:date',getDataByDate)
AuthRouter.post('/user/reports/:id',postUserReport)
AuthRouter.get('/user/reports/:id',getUserReports)
AuthRouter.get('/admin/:id',getMyUsers)
AuthRouter.post('/user/cords/:id',PostCoordinates)
AuthRouter.get('/user/cords/:id/:date', getCoordinatesByDateAndUser);
AuthRouter.post('/admin/notifiactions/:id',notificationsController)
AuthRouter.get('/admin/notifications/:id',getNotifications)
// AuthRouter.post('/status/:id',postStatus)
AuthRouter.post('/logout/:id',logout)
AuthRouter.post('/incidents',postIncident);
AuthRouter.get('/incidents',getIncident)
AuthRouter.post('/cord-set',post_cords)
AuthRouter.get('/cord-set',get_cords)
export default AuthRouter
