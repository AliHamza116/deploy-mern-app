import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });    
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
