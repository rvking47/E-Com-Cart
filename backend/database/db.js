import mongoose from "mongoose";

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_SERVER);
        console.log("Database connected!!");
    }
    catch (err) {
        console.log("Database connection faild!!", err.message);
    }
}

export default ConnectDB;