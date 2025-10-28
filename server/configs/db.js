// import mongoose from "mongoose";

// const connectDB = async ()=> {
//     try{
//         mongoose.connection.on('connected', ()=> console.log('Database Connected'));
//         await mongoose.connect(`${process.env.MONGODB_URI}/QuickShow`);
//     } catch (error){
//         console.log(error.message)
//     }
// }

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/QuickShow`);
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
  }
};

export default connectDB;