
import express from 'express';
import  getAllDepartments  from '../controller/Department.controller.js';
import { verifyAccessToken } from '../helpers/jwt.js';


const departmentRouter = express.Router();

departmentRouter.get('/', getAllDepartments); 

export default departmentRouter;
