const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/config')
const itemModel = require('./models/itemModel')
const items = require('./utils/data')


dotenv.config();
connectDB();


const importData = async () =>{
    try {
        await itemModel.deleteMany()
        const itemsData = await itemModel.insertMany(items)
        console.log("All items Added")
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

importData()