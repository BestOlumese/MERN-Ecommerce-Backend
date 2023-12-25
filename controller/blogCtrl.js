const Blog = require('../models/blogModel')
const User  = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongodbid = require('../utils/validateMongodbid');

const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.json({
            status: "success",
            newBlog,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbid(id)
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {new:true})
        res.json({
            status: "success",
            updateBlog,
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbid(id)
    try {
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes")
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 },
            },
            { new: true }
        )
        res.json(getBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const getBlogs = await Blog.find({})
        res.json(getBlogs)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbid(id)
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id, req.body, {new:true})
        res.json(deleteBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const likeBlog = asyncHandler(async (req,res) => {
    const { blogId } = req.body
    validateMongodbid(blogId)

    // find blog to like
    const blog = await Blog.findById(blogId)
    // find logged in user
    const loginUserId = req?.user?._id
    // check if user has liked the blog
    const isLiked = blog?.isLiked
    // find the user if he disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    )
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false,
        }, { new:true })
    }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, { new:true })
        res.json(blog)
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true,
        }, { new:true })
        res.json(blog)
    }

})

const dislikeBlog = asyncHandler(async (req,res) => {
    const { blogId } = req.body
    validateMongodbid(blogId)

    // find blog to like
    const blog = await Blog.findById(blogId)
    // find logged in user
    const loginUserId = req?.user?._id
    // check if user has liked the blog
    const isDisliked = blog?.isDisliked
    // find the user if he disliked the blog
    const alreadyLiked = blog?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    )
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, { new:true })
    }
    if (isDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false,
        }, { new:true })
        res.json(blog)
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { dislikes: loginUserId },
            isDisliked: true,
        }, { new:true })
        res.json(blog)
    }

})

module.exports = {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    dislikeBlog,
}