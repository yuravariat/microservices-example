import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@yuriv-test/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
