const bodyParser = require("body-parser");
const express = require("express");
const { User } = require("../models");
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find()
        // .sort({ quantity: 1 }); // Sắp xếp theo số lượng tăng dần 
        // .sort({ quantity: -1 }); // Sắp xếp theo số lượng giảm dần 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(userId)
        const { quantity } = req.body;
        if (typeof quantity !== 'number') {
            return res.status(400).json({ message: 'Quantity must be a number' });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { quantity }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post('/create', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = userRouter;