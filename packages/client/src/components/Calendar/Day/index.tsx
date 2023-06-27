import React, { useState } from "react";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { Event, EventModal } from "@/components";
import { BaseInfoType, ICalendarDay } from "@/utils";

const CalendarDay: React.FC<ICalendarDay> = ({ day, month, year, height, isEnabled = false }) => {
  // const { reminders } = useSelector((state) => state.reminders);
  // const dailyReminders = reminders.filter(
  //   (reminder) =>
  //     reminder.day === day && reminder.month === month && reminder.year === year
  // );

  const dailyReminders: any[] = [];

  const weekday = new Date(year, month - 1, day).getDay();
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(false);
  const [baseInfo, setBaseInfo] = useState<BaseInfoType>({
    id: null,
    time: new Date(year, month - 1, day, 0, 0, 0),
    city: "",
    description: "",
  });

  const openAddModal = async () => {
    if (isEnabled) {
      setBaseInfo({
        id: null,
        time: new Date(year, month - 1, day, 0, 0, 0),
        city: "",
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
        baseText={baseInfo.description}
        baseCity={baseInfo.city}
        baseTime={baseInfo.time}
        id={baseInfo.id}
      />
    </>
  );
}

export default CalendarDay;
