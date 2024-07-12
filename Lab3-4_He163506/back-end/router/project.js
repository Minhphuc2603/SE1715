import express from 'express';


import { verifyAccessToken } from '../helpers/jwt.js';
import { createProject, getAllProject } from '../controller/Projects.controller.js';


const projectRouter = express.Router();

projectRouter.get('/', getAllProject);
projectRouter.post('/', verifyAccessToken, createProject);





export default projectRouter;