//import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const userRoutes = require('./routes/user');
require("dotenv").config();


//app
const app = express();


//db
mongoose
.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("DB connected"))
.catch((err)=>console.log("DB CONNECTION ERROR",err));


//middleware
app.use(morgan("dev"));
app.use(cors({origin:true,credentials:true}));
app.use(express.json())


//routes
app.use('/api/user',userRoutes);


//port
const port = process.env.PORT || 8000;

app.listen(port,()=>console.log(`Server is running on port ${port}`));

//7V9oZVnV2cEFKstb