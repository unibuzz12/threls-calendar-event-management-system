import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Button, Modal, Typography, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TimePicker } from "@mui/x-date-pickers";
import { IEventModal } from "@/utils/interfacesUtil";

const EventModal: React.FC<IEventModal> = (props) => {
  const { day, month, year, isEdit, open, handleClose, events, setEvents, baseInfo, error, setError } = props;

  const [formData, setFormData] = useState({
    name: baseInfo.name ? baseInfo.name : '',
    location: baseInfo.location ? baseInfo.location : '',
    description: baseInfo.description ? baseInfo.description : '',
    start_time: baseInfo.start_time ? dayjs(baseInfo.start_time) : dayjs(`${year}-${month}-${day}T00:00`),
    end_time: baseInfo.end_time ? dayjs(baseInfo.end_time) : dayjs(`${year}-${month}-${day}T00:00`),
  });

  const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if(isEdit) {
      try {
        const response = await axios.patch(`http://localhost:4000/events/${baseInfo._id}`, formData);
        const updatedEvents = events.map((event) => {
          if(event._id === response.data._id) {
            return response.data;
          } else {
            return event;
          }
        });
        setEvents(JSON.parse(JSON.stringify(updatedEvents)));
        handleClose();
      } catch (error) {
        setError(error?.response?.data);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:4000/events', formData);
        setEvents([...events, response.data]);
        handleClose();
      } catch (error) {
        setError(error?.response?.data);
      }
    }
  };

  const handleInputChange = (event: { target: { name: string; value: string | Date; }; }) => {
    setError(null);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleStartTimeChange = (time: any) => {
    setError(null);
    setFormData({
      ...formData,
      start_time: time.$d,
    });
  }

  const handleEndTimeChange = (time: any) => {
    setError(null);
    setFormData({
      ...formData,
      end_time: time.$d,
    });
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/events/${id}`)
      const deletedEventIndex = events.findIndex((event) => event._id === id);
      events.splice(deletedEventIndex, 1);
      setEvents([...events]);
      handleClose();
    } catch (error) {
      setError(error?.response?.data);
    }
  }

  useEffect(() => {
    setFormData({
      name: baseInfo.name ? baseInfo.name : '',
      location: baseInfo.location ? baseInfo.location : '',
      description: baseInfo.description ? baseInfo.description : '',
      start_time: baseInfo.start_time ? dayjs(baseInfo.start_time) : dayjs(`${year}-${month}-${day}T00:00`),
      end_time: baseInfo.end_time ? dayjs(baseInfo.end_time) : dayjs(`${year}-${month}-${day}T00:00`),
    })
  }, [baseInfo, day, month, year]);

  return (
    <Modal open={open} onClose={handleClose} className="event-modal-edit">
      <div className="event-modal-content">
        <Typography variant="h4">{isEdit ? "Edit Event" : "Add Event"}</Typography>
        {error && <p className="event-modal-error">Error: {error?.message}</p>}
        <form
          onSubmit={handleFormSubmit}
          className="event-modal-form"
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
          />
          {isEdit ?
            <div className="event-modal-time-selector">
              <TimePicker
                label="Start Time"
                value={dayjs(formData.start_time)}
                readOnly
              />
              <TimePicker
                label="End Time"
                value={dayjs(formData.end_time)}
                readOnly
              />
            </div> :
            <div className="event-modal-time-selector">
              <TimePicker
                label="Start Time"
                defaultValue={dayjs(`${year}-${month}-${day}T00:00`)}
                value={dayjs(formData.start_time)}
                onChange={handleStartTimeChange}
              />
              <TimePicker
                label="End Time"
                defaultValue={dayjs(`${year}-${month}-${day}T00:00`)}
                value={dayjs(formData.end_time)}
                onChange={handleEndTimeChange}
              />
            </div>
          }
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {isEdit ? "Update" : "Add"}
          </Button>
          {isEdit &&
            <Button
              variant="outlined"
              startIcon={<Delete />}
              onClick={() => handleDeleteEvent(baseInfo._id)}
            >
              Delete
            </Button>
          }
        </form>
      </div>
    </Modal>
  )
}

export default EventModal;
