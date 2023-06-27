import axios from "axios";
import { useState, useEffect } from "react";
import { EventType } from "@/utils/typesUtil";

const useFetchEvent = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/events');
      console.log(response);
      setEvents(response as unknown as EventType[]);
    };
    fetchData();
  }, []);

  return {
    events,
  }
}

export default useFetchEvent;
