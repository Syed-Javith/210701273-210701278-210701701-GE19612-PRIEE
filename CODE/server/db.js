const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database is connected`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB;