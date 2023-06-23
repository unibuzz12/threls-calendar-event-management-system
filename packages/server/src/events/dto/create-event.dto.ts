import { IsNotEmpty, IsDate, IsString } from 'class-validator';
export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description?: string;

  @IsNotEmpty()
  @IsDate()
  start_time: Date;

  @IsNotEmpty()
  @IsDate()
  end_time: Date;

  location?: string;
}
