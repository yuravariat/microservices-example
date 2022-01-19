import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const start = async () => {
  try {
   // nats clieant init
   await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID || 'exparation',
    process.env.NATS_CLIENT_ID || 'exparation-srv-client',
    process.env.NATS_URL || 'http://nats-srv:4222'
  );

  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    
  } catch (err) {
    console.error(err);
  }
};

start();
