import mongoose from "mongoose";

const connectToMongo =async () =>
    {
        try {
            await mongoose.connect(process.env.MONGO_DB_URI)
            console.log("connected to mongoDB")
            
        } catch (error) {
            console.log("error",error)
        }
    }
export default connectToMongo