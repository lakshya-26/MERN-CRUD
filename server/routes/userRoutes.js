const User = require("../models/userModel.js");
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    const {name, email, age} = req.body;
    try {
        const userData = await User.create({
            name,
            email,
            age})
        res.status(201).json(userData);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
})

router.get('/', async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const singleUser = await User.findById({
            _id: id
        })
        res.status(200).json(singleUser);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete({
            _id: id
        })
        res.status(200).json(deleteUser);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {name, email, age} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body,{
                new:true
            })
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


module.exports= router;