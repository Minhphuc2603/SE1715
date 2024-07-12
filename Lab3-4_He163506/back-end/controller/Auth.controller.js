import createError from 'http-errors';
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { signAccessToken } from "../helpers/jwt.js";

 const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            throw createError.BadRequest();

        const usernameExist = await User.findOne({ 'username': username });
        if (usernameExist)
            throw createError.Conflict(`${username} is already been registered.`);

        const hashPass = await bcrypt.hash(password, 10); // Change to a fixed salt rounds value
        const savedUser = await User.create({ username, password: hashPass });

        res.status(201).send({
            message: "Register success",
        });
    } catch (error) {
        next(error);
    }
};

 const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            throw createError.BadRequest(`Invalid Username/Password`);

        const existUser = await User.findOne({ username: username }).exec();
        if (!existUser)
            throw createError.NotFound('User not registered');

        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch)
            throw createError.Unauthorized('Username/Password not valid');

        const accessToken = await signAccessToken(existUser.id);

        res.status(200).send({message:"Login success", username, accessToken });
    } catch (error) {
        next(error);
    }
};

export { register, login };
