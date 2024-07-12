import Employees from "../models/Employees.js";
import moment from 'moment';

 const getEmployeesByDepartmentId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const employees = await Employees.find({ department: id });
        const result = employees.map(employee => {
            const { createdAt, updatedAt, __v, department, dob, ...employeeData } = employee._doc;
            return {
                ...employeeData,
                dob: moment(dob).format('DD/MM/YYYY'),
            };
        });

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};

export default getEmployeesByDepartmentId;


