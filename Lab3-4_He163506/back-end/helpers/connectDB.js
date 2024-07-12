import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw new Error(error.toString());
    }
};

export default connectDB;
