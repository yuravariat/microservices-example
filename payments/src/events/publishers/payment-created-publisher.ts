import { Subjects, Publisher, PaymentCreatedEvent } from '@yuriv-test/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
