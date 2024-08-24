import React, { useState, useEffect } from "react";
import { config } from '../ConsantsFile/Constants';
import './HomeworkForm.css'; // Import the CSS file

const url = config.url.BASE_URL;

function HomeworkForm() {
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [weekData, setWeekData] = useState({});
  const [homework, setHomework] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchGrades();
    fetchWeekData(date);
  }, [date]);

  const fetchGrades = async () => {
    try {
      const response = await fetch(url + `/grades`);
      const data = await response.json();
      setGrades(data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const fetchWeekData = async (selectedDate) => {
    console.log(`Fetching week data for date: ${selectedDate}`);
    try {
      const response = await fetch(url + `/weeks?date=${selectedDate}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Weeks data:", data);

      if (data && data.startDate && data.endDate && data.weekNumber) {
        const formattedStartDate = formatDateArray(data.startDate);
        const formattedEndDate = formatDateArray(data.endDate);
        
        setWeekData({
          weekNumber: data.weekNumber,
          startDate: formattedStartDate,
          endDate: formattedEndDate
        });
      } else {
        setWeekData({
          weekNumber: "N/A",
          startDate: "N/A",
          endDate: "N/A"
        });
        console.warn("No valid week data returned.");
      }
    } catch (error) {
      console.error("Error fetching week data:", error);
    }
  };

  const formatDateArray = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length !== 3) {
      console.error("Invalid date array:", dateArray);
      return "Invalid Date";
    }

    const [year, month, day] = dateArray;
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newHomework = {
      week_number: weekData.weekNumber,
      grade_id: selectedGrade,
      home_work: homework,
      description: description,
    };

    try {
      const response = await fetch(url+`/homework`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHomework),
      });

      if (response.ok) {
        alert("Homework created successfully!");
      } else {
        alert("Failed to create homework.");
      }
    } catch (error) {
      console.error("Error creating homework:", error);
    }
  };

  return (
    <form className="homework-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Week No:</label>
        <input type="text" value={weekData.weekNumber || "Loading..."} readOnly />
      </div>
      <div className="form-group">
        <label>Start Date:</label>
        <input type="text" value={weekData.startDate || "Loading..."} readOnly />
      </div>
      <div className="form-group">
        <label>End Date:</label>
        <input type="text" value={weekData.endDate || "Loading..."} readOnly />
      </div>
      <div className="form-group">
        <label>Grade:</label>
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          <option value="">Select Grade</option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.id} -- {grade.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Homework:</label>
        <textarea
          value={homework}
          onChange={(e) => setHomework(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button className="submit-btn" type="submit">Submit</button>
    </form>
  );
}

export default HomeworkForm;
