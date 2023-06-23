import { IsNotEmpty, IsDateString, IsString } from 'class-validator';
export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description?: string;

  @IsNotEmpty()
  @IsDateString()
  start_time: Date;

  @IsNotEmpty()
  @IsDateString()
  end_time: Date;

  location?: string;
}
