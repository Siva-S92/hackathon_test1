import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { productRouter } from './routes/productRoute.js';




// config the env variables
dotenv.config()


// server setup
const app = express();
const port = process.env.PORT;

//Middlewares
app.use(express.json({limit: '60mb'}))
app.use(express.urlencoded({extended: true, limit: '60mb'}))
app.use(cors({origin: "*"}))


// database connection


//Routes
app.get('/', async (req, res) => res.send("Express started"))
app.use('/api', productRouter)



//listern the server
app.listen(port, ()=> {
    console.log(`server running on the port ${port}`)
})


