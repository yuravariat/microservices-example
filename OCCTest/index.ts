import mongoose from 'mongoose';
import { Ticket } from './models/ticket';

const start = async () => {
  try {
    const mongoDbUrl = process.env.MONGODB_URL || 'localhost:27017'
    console.log(`connecting to mongo db on url: ${mongoDbUrl}`);
    await mongoose.connect(`mongodb://${mongoDbUrl}/orders`);

    // const id = new mongoose.Types.ObjectId().toHexString();
    // const ticket = Ticket.build({
    //   id,
    //   title: 'title',
    //   price: 50,
    // });
    // await ticket.save();

    const _ticket = {
      id: new mongoose.Types.ObjectId("61d8d26290b4094554a74039"),
      title: 'title',
      price: 70,
      version: 2
    }

    const ticket = await Ticket.findOne({
      _id: _ticket.id,
      version: _ticket.version - 1,
    });;

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const { title, price } = _ticket;
    ticket.set({ title, price });
    await ticket.save();
    
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  
};

start();
