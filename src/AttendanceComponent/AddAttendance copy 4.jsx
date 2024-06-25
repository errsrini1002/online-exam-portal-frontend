import { useState, useEffect } from "react";
import { config } from '../ConsantsFile/Constants';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = config.url.BASE_URL;

// CODE FOR ALL STUDENTS AND ONE STUDENT 
const AttendanceView = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [studentId, setStudentId] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);

    const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

    const fetchAttendanceByYear = async () => {
        try {

            const response = await fetch(url + `/attendance/year/${year}`);
            if (response.ok) {
                const data = await response.json();
                setAttendanceData(data);
            } else {
                toast.error("Error fetching attendance data");
            }
        } catch (error) {
            toast.error("Error fetching attendance data");
        }
    };

    const fetchAttendanceByStudentId = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await fetch(url + `/attendance/student/${studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setAttendanceData(data);
                } else {
                    toast.error("Error fetching attendance data");
                }
            } catch (error) {
                toast.error("Error fetching attendance data");
            }
        }
    };
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
  };

    return (
        <div>
            <div>
                <label>Year:</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">Select Year</option>
                    <option value="Year 4">Year 4</option>
                    <option value="Year 5">Year 5</option>
                    <option value="Year 6">Year 6</option>
                    <option value="GCSE">GCSE</option>

                </select>
            </div>
            <div>
                <label>Month:</label>
                <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
            </div>
            <button onClick={fetchAttendanceByYear}>Fetch Attendance</button>
            <div>
                <label>Student ID:</label>
                <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    onKeyPress={fetchAttendanceByStudentId}
                />
            </div>
            <div>
                <h4>Students:</h4>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '2px solid black', padding: '8px' }}>Student ID</th>
                            <th style={{ border: '2px solid black', padding: '8px' }}>Name</th>
                            <th style={{ border: '2px solid black', padding: '8px' }}>Topic</th>
                            <th style={{ border: '2px solid black', padding: '8px' }}>Attendance</th>
                            <th style={{ border: '2px solid black', padding: '8px' }}>Year</th>
                            <th style={{ border: '2px solid black', padding: '8px' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.filter(record => {
                            const recordDate = new Date(record.date);
                            const selectedDate = new Date(month);
                            return recordDate.getMonth() === selectedDate.getMonth() &&
                                recordDate.getFullYear() === selectedDate.getFullYear();
                        }).map(record => (
                            <tr key={record.id}>
                                <td style={{ border: '2px solid black', padding: '8px' }}>{record.studentId}</td>
                                <td style={{ border: '2px solid black', padding: '8px' }}>{record.name}</td>
                                <td style={{ border: '2px solid black', padding: '8px' }}>{record.topic}</td>
                                <td style={{ border: '2px solid black', padding: '8px', color: record.present ? 'green' : 'red' }}>
                                    {record.present ? 'Present' : 'Absent'}
                                </td>
                                <td style={{ border: '2px solid black', padding: '8px' }}>{record.year}</td>
                                <td style={{ border: '2px solid black', padding: '8px' }}>{formatDate(record.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AttendanceView;
