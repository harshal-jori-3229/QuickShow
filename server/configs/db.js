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
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URI}/QuickShow`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Listen for connection success
    mongoose.connection.on("connected", () => {
      console.log("✅ Database Connected Successfully");
    });

    // Listen for errors
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Connection Error:", err);
    });

  } catch (error) {
    console.error("❌ Connection Failed:", error.message);
  }
};

export default connectDB;