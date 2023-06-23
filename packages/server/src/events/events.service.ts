import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<Event | null> {
    return this.eventModel.findById(id);
  }

  async update(id: ObjectId, updateEventDto: UpdateEventDto) {
    return this.eventModel.updateOne(
      { _id: id },
      {
        name: updateEventDto.name,
        description: updateEventDto.description,
        location: updateEventDto.location,
        start_time: updateEventDto.start_time,
        end_time: updateEventDto.end_time,
      },
    );
  }

  async remove(id: ObjectId) {
    return this.eventModel.deleteOne({ _id: id });
  }
}
