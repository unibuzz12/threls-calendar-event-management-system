import React, { useState } from "react";

import { Navbar, Calendar } from "@/components";
import { getCurrentDate } from "@/utils/dateUtil";
import { CurrentDateType } from "@/utils/typesUtil";

const Home: React.FC = () => {
  const { date, month, year } = getCurrentDate();
  const [selectedDate, setSelectedDate] = useState<CurrentDateType>({date, month, year});

  return (
    <>
      <Navbar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <Calendar
        date={selectedDate.date}
      />
    </>
  )
}

export default Home;
