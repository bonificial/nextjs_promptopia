import mongoose from "mongoose";


let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('MONGODB is already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'promptopia', useNewUrlParser: true, useUnifiedTopology: true
        })
        isConnected = true
        console.log('MONGODB connection successful')
    } catch (error) {
        console.log('MONGODB connection failed',error)
    }
}