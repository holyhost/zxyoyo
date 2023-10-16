import mongoose from "mongoose"

let isConnected = false

export const connectToDB =async () => {
    mongoose.set('strictQuery', true)
    if(isConnected){
        console.log('MongoDB is already connected')
        return
    }
    console.log("db not connect, will do connect action...")
    try{
        await mongoose.connect(process.env.MONGODB_URI ?? '', {
            autoCreate: true,
            autoIndex: true
        })
        isConnected = true
        console.log("MongoDB is connected")
    }catch(error: any) {
        console.log('mongodb connect failed, following is errors')
        console.log(error)
    }
}