import express from "express";
import bodyParser from "body-parser";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import researcherRoutes from "./routes/researcherRoute.js";
import scholarRoutes from "./routes/scholarRoute.js";
import researchers from "../backend/models/researcherModel.js";
import fs from 'fs';
import cors from 'cors';

dotenv.config({
    path: './env'
});

// database connection
connectDB();

const app = express()

//read json file
const jsonData = fs.readFileSync('researchers.json' , 'utf-8');
const data = JSON.parse(jsonData);
// console.log(data);

//insert json data into mongodb
// researchers.insertMany(data)
// .then(()=>console.log('Data inserted successfully'))
// .catch((err)=>console.error('Error in inserting data', err));

//define cors origin
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests only from this origin
    methods: ['GET', 'POST'], // Allow only specified HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow additional headers
  };



// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

// routes

app.use('/api/v1/auth', authRoutes);
app.use('/api/researchers',researcherRoutes);
app.use('/api/v1/scholars',scholarRoutes);

// api

app.get('/', (req, res) => {
      res.send("<h1>Welcome to our app</h1>")
})

const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`.bgCyan.white)
})