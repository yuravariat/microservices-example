import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

import { app } from './app';

const start = async () => {
  try {

    // nats clieant init
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID || 'ticketing',
      process.env.NATS_CLIENT_ID || 'ticketing-srv-client',
      process.env.NATS_URL || 'http://nats-srv:4222'
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    const mongoDbUrl = process.env.MONGODB_URL || 'localhost:27017'
    console.log(`connecting to mongo db on url: ${mongoDbUrl}`);
    await mongoose.connect(`mongodb://${mongoDbUrl}/tickets`);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
