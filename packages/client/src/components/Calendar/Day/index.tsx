import React, { useState } from "react";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { Event, EventModal } from "@/components";
import { ICalendarDay, EventType } from "@/utils";
import { useFetchEvent } from "@/hooks";


const CalendarDay: React.FC<ICalendarDay> = ({ day, month, year, height, isEnabled = false }) => {  
  const { events, setEvents } = useFetchEvent();
  const dailyReminders = events.filter((event) => 
    new Date(event.start_time).getDate() === day && new Date(event.start_time).getMonth() === month - 1 && new Date(event.start_time).getFullYear() === year
  );

  const weekday = new Date(year, month - 1, day).getDay();
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(false);
  const [baseInfo, setBaseInfo] = useState<EventType>({
    _id: "",
    name: "",
    start_time: new Date(year, month - 1, day, 0, 0, 0),
    end_time: new Date(year, month - 1, day, 0, 0, 0),
    location: "",
    description: "",
  });

  const openAddModal = async () => {
    if (isEnabled) {
      setBaseInfo({
        _id: "",
        name: "",
        start_time: new Date(year, month - 1, day, 0, 0, 0),
        end_time: new Date(year, month - 1, day, 0, 0, 0),
        location: "",
        description: "",
      });
      setEdit(false);
      setIsEditing(true);
    }
  };

  const handleClose = () => {
    setEdit(false);
    setIsEditing(false);
  };

  const enabledClass = isEnabled
    ? "calendar-day-card"
    : "calendar-day-card calendar-day-card--disabled";

  const weekdayCheckClass =
    weekday > 5 || weekday < 1 ? "calendar-day-weekend" : "";

  return (
    <>
      {dailyReminders.length > 0 ? (
        <Card
          variant="outlined"
          style={{ height }}
          className={`${enabledClass} ${weekdayCheckClass}`}
        >
          <CardContent className="calendar-day-content">
            <Grid item>
              <div className="calendar-day-header">
                <p className="calendar-day-text">{day}</p>
              </div>
            </Grid>
            <div className="calendar-day-reminders-handle">
              <Event
                isEnabled={isEnabled}
                dailyReminders={dailyReminders}
                setIsEditing={setIsEditing}
                setBaseInfo={setBaseInfo}
                setEdit={setEdit}
              />
              <div className="calendar-day-add-reminder-div">
                <Button
                  className="calendar-day-add-reminder-button"
                  onClick={openAddModal}
                  variant="contained"
                  color="primary"
                >
                  +
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          variant="outlined"
          style={{ height }}
          className={`${enabledClass} ${weekdayCheckClass}`}
          onClick={openAddModal}
        >
          <CardContent className="calendar-day-content">
            <Grid item>
              <div className="calendar-day-header">
                <p className="calendar-day-text">{day}</p>
              </div>
            </Grid>
          </CardContent>
        </Card>
      )}
      <EventModal
        day={day}
        month={month}
        year={year}
        open={isEditing}
        isEdit={edit}
        handleClose={handleClose}
        events={events}
        setEvents={setEvents}
        baseInfo={baseInfo}
      />
    </>
  );
}

export default CalendarDay;
