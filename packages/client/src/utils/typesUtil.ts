export type CurrentDateType = {
  date: Date,
  month: string,
  year: string,
};

export type EventType = {
  _id: string;
  name: string;
  description?: string;
  start_time: Date;
  end_time: Date;
  location?: string;
}