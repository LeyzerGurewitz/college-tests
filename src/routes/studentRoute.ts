import express, {Router} from 'express';
import {registerStudent, getStudentGrades} from "../controllers/studentController"
import {checkStudentRole} from "../middleware/studentMiddleware"

const router: Router = express.Router();



router.route('/register').post(registerStudent)
router.use(checkStudentRole)
router.route('/allGrades').get(getStudentGrades)

export default router
