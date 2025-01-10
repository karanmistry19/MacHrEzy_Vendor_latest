import React, { useState } from "react";
import DatePicker from "react-date-picker";

const WebDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker onChange={handleDateChange} value={selectedDate} />
    </div>
  );
};

export default WebDatePicker;
