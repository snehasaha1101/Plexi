import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection = async (username, password) => {
    const user = username || process.env.DB_USERNAME;
    const pass = password || process.env.DB_PASSWORD;
    const envUri = process.env.MONGODB_URI;

    if (!envUri && (!user || !pass)) {
        console.log('Missing DB credentials. Set MONGODB_URI or DB_USERNAME and DB_PASSWORD in environment.');
        return;
    }

    const URL = envUri || `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@cluster0.19lfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database', error);
    }
}

export default Connection;