
import Department from '../models/Departments.js';

 const getAllDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find();
        res.status(200).send(departments);
    } catch (error) {
        next(error);
    }
};
export default getAllDepartments;
