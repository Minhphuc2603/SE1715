require("dotenv").config();

const express = require('express');
const morgan = require("morgan");
const httpErrors = require("http-errors");
const bodyParser = require("body-parser");
const db = require("./models");
const userRouter = require("./routes/User.routes");
const postRouter = require("./routes/Post.routes");
const profileRouter = require("./routes/Profile.routes");
// const { ProjectRouter, EmployeeRouter, AuthRouter } = require("./routes");


const app = express();
app.use(morgan("dev"));     

app.use(bodyParser.json());


app.use("/user",userRouter);
app.use("/post", postRouter);
app.use("/profile",profileRouter)

app.use(async(req, res, next) => {
    next(httpErrors.NotFound());
})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})


const PORT = process.env.PORT || 8080;
const HOST_NAME = process.env.HOST_NAME;
app.listen(PORT, HOST_NAME, () => {
    console.log(`Server is running at http://${HOST_NAME}:${PORT}`);
    db.connectDB();
});







// const startDate = "2024-07-11T23:08:31.520Z";
// const date = new Date(startDate);
// const year = date.getFullYear();
// const month = String(date.getMonth() + 1).padStart(2, '0');
// const day = String(date.getDate()).padStart(2, '0');
// const formattedDate = `${year}-${month}-${day}`;// "2024-07-11"
// console.log(formattedDate);

