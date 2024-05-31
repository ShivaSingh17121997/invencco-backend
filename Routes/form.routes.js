// routes/userRoutes.js

const express = require('express');
const router = express.Router();

const UserModel = require('../Models/UserForm');

// POST request to create a new user
router.post('/post', async (req, res) => {
    try {
        // Extract data from request body
        const { firstName, lastName, email, status, phoneNo, address } = req.body;

        // Create a new user instance
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            status,
            phoneNo,
            address
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser); // Return the saved user as response
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

// GET request 
router.get('/get', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// DELETE request
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT request to update
router.put('/edit/:id', async (req, res) => {
    try {
        const { firstName, lastName, email, status, phoneNo, address } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
            firstName,
            lastName,
            email,
            status,
            phoneNo,
            address
        }, { new: true }); // 
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = { router };
