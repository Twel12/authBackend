import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

if (!process.env.DATABASE) {
    throw new Error('Invalid/Missing environment variable: "DATABASE"');
}
if (!process.env.DATABASE_PASSWORD) {
    throw new Error('Invalid/Missing environment variable: "DATABASE_PASSWORD"');
}
if (!process.env.PORT) {
    throw new Error('Invalid/Missing environment variable: "PORT"');
}

const DB_URL: string = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const PORT: number = parseInt(process.env.PORT || '3001', 10);

mongoose.set('strictQuery',true);
mongoose.connect(DB_URL,{
}).then( con => {
    console.log("database connected at URL", DB_URL);
})

app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT}`);
});