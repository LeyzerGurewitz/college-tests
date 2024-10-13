import express, {Router} from 'express';
import {registerTeacher} from "../controllers/teacherController"
const router: Router = express.Router();


router.route('/register').post(registerTeacher)








export default router;
