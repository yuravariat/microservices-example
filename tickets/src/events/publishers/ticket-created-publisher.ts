import { Publisher, Subjects, TicketCreatedEvent } from '@yuriv-test/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
