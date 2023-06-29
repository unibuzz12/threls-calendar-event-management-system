import React from "react";
import { IEvent } from "@/utils";

const Event: React.FC<IEvent> = ({
  isEnabled,
  dailyReminders,
  setIsEditing,
  setBaseInfo,
  setEdit,
}) => {
  if (!isEnabled) return null;
  const openEditModal = (id: string | null) => {
    console.log(id, dailyReminders);
    const reminderIndex = dailyReminders.findIndex((item) => item._id === id);
    const reminder = dailyReminders[reminderIndex];
    console.log(reminder);
    setBaseInfo({
      id: reminder._id,
      start_time: reminder.start_time,
      end_time: reminder.end_time,
      name: reminder.name,
      description: reminder.description,
      location: reminder.location,
    });
    setEdit(true);
    setIsEditing(true);
  };

  return (
    <div className="calendar-reminders">
      {dailyReminders.map((reminder) => (
        <div
          className="calendar-reminder"
          key={reminder._id}
          onClick={() => openEditModal(reminder._id)}
        >
          <span>
            {new Date(reminder.start_time).getHours() + " : " + new Date(reminder.start_time).getMinutes()}
          </span>
          <span>{reminder.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Event;
