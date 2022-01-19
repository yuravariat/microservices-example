import { Publisher, Subjects, TicketUpdatedEvent } from '@yuriv-test/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
