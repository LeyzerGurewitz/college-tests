import express, {Router} from 'express';
import {registerStudent} from "../controllers/studentController"
const router: Router = express.Router();



router.route('/register').post(registerStudent)


export default router
