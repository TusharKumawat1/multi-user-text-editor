import { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connectToMongo=async()=>{
    try {
        await connect(process.env.MONGODB_URI)
        console.log("connected to dataBase")
    } catch (error) {
        console.log("error in conection ",error)
    }
}
export default connectToMongo;