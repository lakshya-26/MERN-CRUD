const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes.js")
dotenv.config({
    path: './.env'
})
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(`${process.env.MONGO}mernPrac`)
.then(() => {
    console.log("connected successfully");
})
.catch((err) => {
    console.log(err);
})

app.use(userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`server is running on port ${PORT}`);
});