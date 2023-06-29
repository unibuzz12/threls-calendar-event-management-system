import axios from "axios";
import { useState, useEffect } from "react";
import { EventType } from "@/utils/typesUtil";

const useFetchEvent = () => {
  const [events, setEvents] = useState<EventType[]>([]);  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/events');
        setEvents(response.data as unknown as EventType[]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    loading,
    events,
    setEvents,
  }
}

export default useFetchEvent;
