const express = require('express')
const { getItem ,addItem, EditItem, DeleteItem} = require('../controller/ItemController')
const router = express.Router()


router.get('/get-item' , getItem)
router.post('/add-item' , addItem)
router.put('/edit-item' , EditItem)
router.post('/delete-item' , DeleteItem)



module.exports = router