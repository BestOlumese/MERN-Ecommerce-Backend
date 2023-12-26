const express = require('express')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog, uploadImages } = require('../controller/blogCtrl')
const router = express.Router()
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages')

router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/upload/:id', 
        authMiddleware, 
        isAdmin, 
        uploadPhoto.array('images',10),
        productImgResize,
        uploadImages)
router.put('/likes', authMiddleware, likeBlog)
router.put('/dislikes', authMiddleware, dislikeBlog)
router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.delete('/:id', authMiddleware, isAdmin, deleteBlog)
router.get('/:id', getBlog)
router.get('/', getAllBlogs)

module.exports = router