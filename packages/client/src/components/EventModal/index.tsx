import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Button, Modal, Typography, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TimePicker } from "@mui/x-date-pickers";
import { IEventModal } from "@/utils/interfacesUtil";

const EventModal: React.FC<IEventModal> = (props) => {
  const { day, month, year, isEdit, open, handleClose, events, setEvents, baseInfo } = props;

  const [formData, setFormData] = useState({
    name: baseInfo.name ? baseInfo.name : '',
    location: baseInfo.location ? baseInfo.location : '',
    description: baseInfo.description ? baseInfo.description : '',
    start_time: baseInfo.start_time ? dayjs(baseInfo.start_time) : dayjs(`${year}-${month}-${day}T00:00`),
    end_time: baseInfo.end_time ? dayjs(baseInfo.end_time) : dayjs(`${year}-${month}-${day}T00:00`),
  });
  const [error, setError] = useState<AxiosError | null>();


  const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = isEdit ? await axios.patch(`http://localhost:4000/events/${baseInfo.id}`, formData) : await axios.post('http://localhost:4000/events', formData);
      setEvents([...events, response.data]);
      setError(null);
      handleClose();
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  const handleInputChange = (event: { target: { name: string; value: string | Date; }; }) => {
    console.log(formData);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleStartTimeChange = (e: any) => {
    setFormData({
      ...formData,
      start_time: e.$d,
    });
  }

  const handleEndTimeChange = (e: any) => {
    setFormData({
      ...formData,
      end_time: e.$d,
    });
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
        {error && <p className="event-modal-error">{error?.statusCode} Error: {error?.message}</p>}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {isEdit ? "Update" : "Add"}
          </Button>
          {isEdit &&
            <Button variant="outlined" startIcon={<Delete />}>
              Delete
            </Button>
          }
        </form>
      </div>
    </Modal>
  )
}

export default EventModal;
