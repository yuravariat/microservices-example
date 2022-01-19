import mongoose from 'mongoose';
import { app } from './app'

const start = async () =>{
  const mongoDbUrl = process.env.MONGODB_URL || 'localhost:27017'
  console.log(`connecting to mongo db on url: ${mongoDbUrl}`);
  try{
    await mongoose.connect(`mongodb://${mongoDbUrl}/auth`);
    console.log('connected to mongodb'); 
  }
  catch (err){
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
}

start();

