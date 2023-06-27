export type CurrentDateType = {
  date: Date,
  month: string,
  year: string,
};

export type BaseInfoType = {
  id: string | null,
  time: Date,
  city: string,
  description: string,
}

export type EventType = {
  name: string;
  description?: string;
  start_time: Date;
  end_time: Date;
  location?: string;
}