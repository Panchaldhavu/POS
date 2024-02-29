const itemModel = require('../models/itemModel')

const getItem = async (req, res) => {
    try {
        const items = await itemModel.find()
        res.status(200).send({
            data: items, success: true
        })

    } catch (error) {
        console.log(err)
        res.status(400).send({
            message: "Error in get item api",
            success: false,
            error
        })
    }
}


const addItem = async (req, res) => {
    try {
        const Item = new itemModel(req.body)
        await Item.save()
        res.status(201).send({ message: 'Item added successfully', success: true, data: Item })

    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Error in add item api", success: false, error })
    }
}


const EditItem = async (req, res) => {
    try {
        const { itemId } = req.body
        console.log(itemId)
        await itemModel.findOneAndUpdate({ _id: itemId }, req.body, {
            new: true
        })
        res.status(201).json("item Updated");
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Error in Edit item api", success: false, error })
    }
}


const DeleteItem = async (req, res) => {
    try {
        const { itemId } = req.body
        console.log(itemId)
        await itemModel.findOneAndDelete({ _id: itemId })
        res.status(201).json("item Deleted");
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Error in Delete item api", success: false, error })
    }
}



module.exports = {
    getItem,
    addItem,
    EditItem,
    DeleteItem
}