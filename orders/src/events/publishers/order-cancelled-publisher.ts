import { Subjects, Publisher, OrderCancelledEvent } from '@yuriv-test/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
