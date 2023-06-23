import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { EventValidationService } from './event-validation.service';
import { EventsController } from './events.controller';
import { Event, EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [EventsService, EventValidationService],
  controllers: [EventsController],
})
export class EventsModule {}
