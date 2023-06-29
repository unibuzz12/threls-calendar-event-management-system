import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventValidationService } from './event-validation.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private eventValidationService: EventValidationService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    if (this.eventValidationService.validateEventDuration(newEvent)) {
      throw new BadRequestException('New Event Duration is incorrect.');
    }

    const existingEvents = await this.findAll();
    if (
      this.eventValidationService.validateEventOverlap(newEvent, existingEvents)
    ) {
      throw new BadRequestException('Event overlaps with existing events.');
    }

    try {
      return await newEvent.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create event.');
    }
  }

  async findAll(): Promise<Event[]> {
    try {
      return await this.eventModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve events.');
    }
  }

  async findOne(id: ObjectId): Promise<Event | null> {
    try {
      return await this.eventModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Event with ID ${id} not found.`);
    }
  }

  async update(id: ObjectId, updateEventDto: UpdateEventDto) {
    const existEvent = await this.findOne(id);
    if (!existEvent) {
      throw new NotFoundException(`Event with ID ${id} not found.`);
    }

    try {
      await this.eventModel.findOneAndUpdate(
        { _id: id },
        {
          name: updateEventDto.name,
          description: updateEventDto.description,
          location: updateEventDto.location,
        },
      );

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create event.');
    }
  }

  async remove(id: ObjectId) {
    try {
      return await this.eventModel.findOneAndRemove({ _id: id });
    } catch (error) {
      throw new NotFoundException(`Event with ID ${id} not found.`);
    }
  }
}
