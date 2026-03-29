import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
    const uri = process.env.MONGODB_URI?.trim()
    if (!uri) {
        throw new Error('MONGODB_URI is not set in backend/.env')
    }

    if (uri.startsWith('mongodb+srv://')) {
        dns.setServers(['8.8.8.8', '1.1.1.1'])
        console.log('Using public DNS servers for SRV resolution')
    }

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error.message || error))
    mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'))

    try {
        await mongoose.connect(`${uri}/prescripto`, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        })
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        throw error
    }
}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.