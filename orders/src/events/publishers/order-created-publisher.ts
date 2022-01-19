import { Publisher, OrderCreatedEvent, Subjects } from '@yuriv-test/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
