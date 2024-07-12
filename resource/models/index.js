const mongoose = require("mongoose");
const User = require("./User");
const Post = require("./Post.model");
const Profile = require("./Profile.model");
require("dotenv").config();
mongoose.Promise = global.Promise;

const db = {};

// bỏ sung các thuộc tính cho db
db.mongoose = mongoose;
db.User = User;
db.Post = Post;
db.Profile = Profile;

db.connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
    .then(() => console.log("Connected successfully to server"))
    .catch(error => console.error(error.messsage))
}

module.exports = db;