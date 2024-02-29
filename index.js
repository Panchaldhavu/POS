const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/config')

dotenv.config()

connectDB()


const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('dev'))

// routes
app.use('/api/items' , require('./routes/itemRoutes'))
app.use('/api/users' , require('./routes/userRoutes'))
app.use('/api/bills' , require('./routes/billsRoutes'))


const PORT = process.env.PORT || 8000


app.listen(PORT , () =>{
    console.log(`Server running on port ${PORT}`)
})