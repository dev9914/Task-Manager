import mongoose, { mongo } from "mongoose";

export const DbConnect = async() =>{
    try {
        const connectionInstance = await  mongoose.connect(`${process.env.MONGOURI}/${process.env.DBNAME}`)
        console.log("MongoDb Connected Succesfully")
    } catch (error) {
        console.log(error)
    }
}