const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authorize = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/auth/login',async (req,res)=> {
    try {
        const { email , password } = req.body;
        const existingUser = await User.findOne({ email , password },{ password : 0 })
        if(!existingUser) return res.status(404).send({ message : "User not found" })
        const token = jwt.sign({ user : existingUser },"MY_KEY", { expiresIn : 1*24*60*60 })
        // return res.status(200).send(existingUser)
        return res.status(200).send({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message : "Internal server error" })
    }
})
router.get('/auth/verify/:token', (req,res)=> {
    try {
        const { token } = req.params;
        jwt.verify( token ,"MY_KEY", ( err , decoded ) => {
            console.log(err);
            if(err) return res.status(400).send({ err });
            if(decoded) return res.status(200).send({ user : decoded });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message : "Internal server error" })
    }
})
router.post('/auth/register', async(req,res)=> {
    try {
        const { username , password , mobileNumber , email , pincode , role } = req.body;
        const user = await User.findOne({ email })
        if(user) return res.status(400).send({ message : "User already found" });
        const newUser = new User({
            username,password,mobileNumber,email,pincode , role , isAdmin : false
        })
        await newUser.save()
        res.status(200).send({ message : "Register successful" })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message : "Internal server error" })
    }
})


router.get('/auth/user/:id', async ( req , res ) => {
    try {
        const { id } = req.params;
        // const { role , _id } = req;
        // if(id!=_id){
        //     return res.status(403).send({ message : "Forbidden" })
        // }
        const user = await User.findOne({ _id : id },{ password : 0 })
        if(!user) return res.status(404).send({ message : "User not found" });
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message : "Internal server error" })
    }
})

module.exports = router