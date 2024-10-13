"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// /*
// @swagger
//  * //register:
//  *  post:
//  *      summary: create new teacher
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      type: object
//  *                      properties:
//  *                          fullName:
//  *                              type: string
//  *                          passportId:
//  *                              type: number
//  *                          role:
//  *                              type: string
//  *                          password:
//  *                              type: string
//  *                          grades:
//  *                              type: array
//  *      responses:
//  *          201:
//  *              description: created
//  */
// router.route('/register').post(register);
router.route('/').post(userController_1.login);
exports.default = router;
