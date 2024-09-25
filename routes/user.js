import express from 'express'
import { createUser } from '../controller/user.js';
import { forgotPassword, loginUser, logoutUser, registerUser ,resetPassword} from '../controller/Auth.js';
import { upload } from '../utils/helper.js';
import { authentication } from '../middleware/middleware.js';

const route = express.Router();
route.post('/create/user', createUser);
route.post('/register/user',upload.single("image"),registerUser);
//route.post('/register/user',upload.single("image"),registerUser);
route.post('/login/user',loginUser);
route.post('/logout/user',logoutUser);
route.post('/forgotpassword',forgotPassword);
route.post('/resetPass',resetPassword);

export default route;
