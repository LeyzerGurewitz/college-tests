import express, {Router} from 'express';
import {registerTeacher, addGrade, getClassAverage, getAllUsersGradesController} from "../controllers/teacherController"
import {checkTeacherRole} from "../middleware/teacherMiddleware"

const router: Router = express.Router();


router.route('/register').post(registerTeacher)

router.use(checkTeacherRole)

router.route('/addGrades').post(addGrade)
router.route('/classAverage').get(getClassAverage)
router.route('/gatAllGrades').get(getAllUsersGradesController)



export default router;
