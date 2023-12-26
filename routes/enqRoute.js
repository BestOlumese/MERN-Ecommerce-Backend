const express = require('express')
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getallEnquiry } = require('../controller/enqCtrl')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, isAdmin, createEnquiry)
router.put('/:id', authMiddleware, isAdmin, updateEnquiry)
router.delete('/:id', authMiddleware, isAdmin, deleteEnquiry)
router.get('/:id', getEnquiry)
router.get('/', getallEnquiry)

module.exports = router