import mongoose from 'mongoose';



const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
  
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }

};



export default connectDB;
