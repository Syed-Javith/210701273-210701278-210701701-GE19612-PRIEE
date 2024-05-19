const express = require('express');
const Post = require('../models/post.model');
const authorize = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/food/:lat/:long' , async (req, res) => {
    const { lat , long } = req.params;
    console.log(parseFloat(long),lat);
    try {
        const foods = await Post.find({ 
            coordinates: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [parseFloat(long), parseFloat(lat)]
              },
              $maxDistance: 30000*1000
            }
          } ,  isBooked : false });
        
        return res.status(200).send(foods)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})
router.get('/food/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const food = await Post.findOne({
            _id: id
        });
        return res.status(200).send(food)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})
router.post('/food', async (req, res) => {
    try {
        const {
            description,
            location,
            image,
            distributor,
            foods,
            coordinates,
            distributorId

        } = req.body;
        const newPost = new Post({
            description,
            location,
            image: image || "",
            distributor,
            isBooked: false,
            isDelivered: false,
            foods: foods,
            coordinates: {
                type: "Point",
                coordinates: [coordinates.long, coordinates.lat]
            },
            distributorId
        })
        await newPost.save()
        res.status(200).send({
            message: "Added successful"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})
router.post('/food/code/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const update = await Post.updateOne({
            _id: id
        }, {
            $set: {
                code: req.body.code,
                isBooked: true
            }
        })
        console.log(update);
        res.status(200).send({
            message: "code added successful"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})
router.post('/food/receive/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            code
        } = req.body
        const update = await Post.findOne({
            _id: id,
            code
        })
        if (update) {
            await Post.updateOne({
                _id: id
            }, {
                $set: {
                    isDelivered: true
                }
            })
            res.status(200).send({
                message: "code added successful"
            })
        } else {
            res.status(400).send({
                message: "No such product"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})
router.delete('/food/:id', async (req,res)=>{
    try {
        const { id } = req.params;
        console.log(id);
        const deletePost = await Post.deleteOne({ _id : id })
        console.log(deletePost);
        if(deletePost.deletedCount>0) return res.status(200).send({ message : "Deleted successfully!" })
        return res.status(404).send({ message : "No such food available" })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})
module.exports = router