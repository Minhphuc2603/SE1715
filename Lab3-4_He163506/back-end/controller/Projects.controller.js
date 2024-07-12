import Project from "../models/Projects.js";
import createHttpError from 'http-errors';
import moment from 'moment';

 const getAllProject = async (req, res, next) => {
    try {
        const listProject = await Project.find().populate("department").exec();
        const result = listProject.map(project => {
            const { createdAt, updatedAt, __v, startDate, ...projectWithoutTimestamp } = project._doc;
            return {
                ...projectWithoutTimestamp,
                startDate: moment(startDate).format('DD/MM/YYYY'),
                departmentID: project.department._id,
                departmentName: project.department.name
            };
        });

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

 const createProject = async (req, res, next) => {
    try {
        const { name, description, startDate, type, department } = req.body;
        
        const newProject = new Project({
            name,
            description,
            startDate,
            type,
            department
        });

        const savedProject = await newProject.save();
        res.status(201).send(savedProject);
    } catch (err) {
        next(err);
    }
};
 export { getAllProject, createProject }