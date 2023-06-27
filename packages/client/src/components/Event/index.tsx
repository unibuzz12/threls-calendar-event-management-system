import React from "react";
import { IEvent } from "@/utils/interfacesUtil";

const Event: React.FC<IEvent> = ({
  isEnabled,
  dailyReminders,
  setIsEditing,
  setBaseInfo,
  setEdit,
}) => {
  if (!isEnabled) return null;
  const openEditModal = (id: string | null) => {
    const reminderIndex = dailyReminders.findIndex((item) => item.id === id);
    const reminder = dailyReminders[reminderIndex];
    setBaseInfo({
      id: reminder.id,
      time: reminder.time,
      city: reminder.city,
      description: reminder.description,
    });
    setEdit(true);
    setIsEditing(true);
  };

  return (
    <div className="calendar-reminders">
      {dailyReminders.map((reminder) => (
        <div
          className="calendar-reminder"
          key={reminder.id}
          onClick={() => openEditModal(reminder.id)}
        >
          <span>
            {reminder.time.getHours() + " : " + reminder.time.getMinutes()}
          </span>
          <span>{reminder.city}</span>
        </div>
      ))}
    </div>
  );
};

export default Event;
