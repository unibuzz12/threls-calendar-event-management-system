import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const createdEvent = new this.eventModel(createEventDto);
      return await createdEvent.save();
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
    const event = await this.findOne(id);
    if (event) {
      try {
        return await this.eventModel.updateOne(
          { _id: id },
          {
            name: updateEventDto.name,
            description: updateEventDto.description,
            location: updateEventDto.location,
            start_time: updateEventDto.start_time,
            end_time: updateEventDto.end_time,
          },
        );
      } catch (error) {
        throw new InternalServerErrorException(
          `Failed to update event with ID ${id}.`,
        );
      }
    }
  }

  async remove(id: ObjectId) {
    const event = await this.findOne(id);
    if (event) {
      try {
        return await this.eventModel.deleteOne({ _id: id });
      } catch (error) {
        throw new InternalServerErrorException(
          `Failed to delete event with ID ${id}`,
        );
      }
    }
  }
}
