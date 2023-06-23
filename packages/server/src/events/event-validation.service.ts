import { Injectable } from '@nestjs/common';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventValidationService {
  validateEventOverlap(
    newEvent: Event | Partial<Event>,
    existingEvents: Event[],
  ): boolean {
    for (const existingEvent of existingEvents) {
      if (
        new Date(newEvent.start_time) <= new Date(existingEvent.end_time) &&
        new Date(newEvent.end_time) >= new Date(existingEvent.start_time)
      ) {
        return true; // Overlap detected
      }
    }
    return false; // No overlap detected
  }

  validateEventDuration(event: Event | Partial<Event>): boolean {
    if (new Date(event.start_time) >= new Date(event.end_time)) {
      return true;
    } else {
      return false;
    }
  }
}
