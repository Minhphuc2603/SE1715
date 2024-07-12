import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./helpers/connectDB.js";
import cors from 'cors';
import projectRouter from "./router/project.js";
import employessRouter from "./router/employees.js";
import AuthRouter from "./router/auth.js";
import departmentRouter from "./router/department.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors())

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.use('/projects',projectRouter)
app.use('/employees',employessRouter)
app.use('/departments',departmentRouter)
app.use('/',AuthRouter)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});








app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running on port ${PORT}`);
})