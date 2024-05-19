const express = require('express')
const Request = require('../models/request.model')
const Post = require('../models/post.model')
var randomstring = require("randomstring");
const sendEmail = require('../utils/Mailer');
const router = express.Router()

router.get('/request', async (req, res) => {
    try {
        const requests = await Request.find({},{ token : 0 })
        res.status(200).send(requests)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

router.post('/request', async (req, res) => {
    try {
        const { foodId , userId , foods } = req.body;
        const token = 'N/A'
        const newRequest = new Request({
            foodId , userId , foods , token , isTaken : false
        })
        await newRequest.save()
        return res.status(200).send(newRequest)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

router.patch('/request', async (req, res) => {
    try {
        const { requestId , foodId , email } = req.body;
        const token = randomstring.generate(7);
        const updateRequest = await Request.updateOne({ _id : requestId } , { $set :  { token : token , isTaken : true} });
        const updateFood = await Post.updateOne({ _id : foodId } , { $set : { isBooked : true } })
        //mail it
        sendEmail(email,token)
        return res.status(200).send({ updateFood , updateRequest })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})


router.put('/request', async ( req, res) => {
    try {
        const { requestId , foodId , token } = req.body;
        const requestWithToken = await Request.findOne({ _id : requestId , token : token })
        if(requestWithToken){
            const updateRequest = await Request.deleteOne({ _id : requestId });
            const updateFood = await Post.deleteOne({ _id : foodId })
            return res.status(200).send({ updateFood , updateRequest })
        }
        return res.status(404).send({ message : "Request is invalid" })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

module.exports = router;