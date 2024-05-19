const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    id : mongoose.Types.ObjectId,
    name : {
        type : String,
        require : true
    },
    qty : {
        type : Number,
        require : true
    }
})

const Food = mongoose.model('Food',FoodSchema)

module.exports = Food