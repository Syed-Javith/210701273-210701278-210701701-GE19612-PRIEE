const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    distributor: {
        type: String,
        required: true
    },
    distributorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    isDelivered: {
        type: Boolean,
        required: true
    },
    isBooked: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    code: String,
    foods: String,
    coordinates: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude] format
            required: true
        }
    }
});

// Indexing for geospatial queries
postSchema.index({ coordinates: '2dsphere' });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
