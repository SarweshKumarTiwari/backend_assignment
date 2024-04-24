import { Router } from "express";
import {
    authenticate,
    authorise,
    getAccessToken,
    getLoggedUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller";

const authRoute = Router();

authRoute.post('/user/register', registerUser);
authRoute.post('/user/authorise', authorise);
authRoute.get('/user/userInfo', authenticate, getLoggedUser);
authRoute.get('/user/access_token', getAccessToken);
authRoute.get('/user/logout',authenticate,logoutUser)

export default authRoute;