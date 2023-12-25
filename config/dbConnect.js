const { default: mongoose } = require('mongoose')
require('dotenv').config()

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database error');
    }
}

module.exports = dbConnect