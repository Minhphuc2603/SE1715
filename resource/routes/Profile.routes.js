const express = require('express');
const { Profile } = require('../models');



const profileRouter = express.Router();

profileRouter.post('/', async (req, res) => {
    try {
        const { userId, bio, address } = req.body;
        const newProfile = new Profile({
            user: userId,
            bio,
            address
        });
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

profileRouter.get('/', async (req, res) => {
    try {
        const data = await Profile.find();

        // bỏ đi thuộc tính  createdAt, updatedAt, __v
        // const result = data.map(profile => {
        //     const { createdAt, updatedAt, __v , ...profileData } = profile._doc;
        //     return {
        //        ...profileData          
        //     };
        // }) 
        // chọn những trường dữ liệu
        const profiles = await Profile.find().select('user bio address.city address.zip _id');
        res.status(200).json(profiles);

        
    } catch (error) {
        res.status(500).json({ error: error.messsage })
    }
});

module.exports = profileRouter;
