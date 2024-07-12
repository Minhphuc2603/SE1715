
import express from 'express';
import { verifyAccessToken } from '../helpers/jwt.js';
import getEmployeesByDepartmentId from '../controller/Employees.controller.js';


const employessRouter = express.Router();

employessRouter.get('/:id', getEmployeesByDepartmentId);

 


export default employessRouter;