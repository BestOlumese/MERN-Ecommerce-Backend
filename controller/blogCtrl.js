const Blog = require('../models/blogModel')
const User  = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongodbid = require('../utils/validateMongodbid');

const createBlog = asyncHandler(async (req, res) => {

})

module.exports = {
    createBlog,
}