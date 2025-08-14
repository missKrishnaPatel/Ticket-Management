// const mongoose = require("mongoose");
import mongoose from "mongoose";

const connectDB = async() => {
    try{
         await mongoose.connect(process.env.MONGO_URI);
         console.log("Connected");
    } catch(error){
         console.error("MongoDB error" , error.message);
         process.exit(1);

    }
};


export default connectDB;


