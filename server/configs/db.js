import mongoose from "mongoose";

const connectDB = async ()=> {
    try{
        mongoose.connection.on('connected', ()=> console.log('Database Connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/QuickShow`);
    } catch (error){
         console.log("❌ Database Connection Error:", error.message);
    }
}

export default connectDB;