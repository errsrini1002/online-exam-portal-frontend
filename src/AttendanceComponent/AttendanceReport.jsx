import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../ConsantsFile/Constants';

const url = config.url.BASE_URL;

const AttendanceView = () => {
    const [studentId, setStudentId] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [studentYear, setStudentYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

    const fetchAttendanceByStudentId = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await fetch(url + `/attendance/student/${studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setAttendanceData(filterAttendanceByMonth(data));
                    // Assuming the response contains student details
                    if (data.length > 0) {
                        setStudentName(data[0].name); // Assuming name is available in the first record
                        setStudentYear(data[0].year); // Assuming year is available in the first record
                    }
                } else {
                    toast.error("Error fetching attendance data");
                }
            } catch (error) {
                toast.error("Error fetching attendance data");
            }
        }
    };

    const filterAttendanceByMonth = (data) => {
        if (!selectedMonth || !selectedYear) return data;

        const filteredData = data.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate.getMonth() === selectedMonth - 1 && recordDate.getFullYear() === selectedYear;
        });

        // Sort data by date in ascending order
        filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

        return filteredData;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const months = [
        { value: 1, label: 'Jan' },
        { value: 2, label: 'Feb' },
        { value: 3, label: 'Mar' },
        { value: 4, label: 'Apr' },
        { value: 5, label: 'May' },
        { value: 6, label: 'Jun' },
        { value: 7, label: 'Jul' },
        { value: 8, label: 'Aug' },
        { value: 9, label: 'Sep' },
        { value: 10, label: 'Oct' },
        { value: 11, label: 'Nov' },
        { value: 12, label: 'Dec' },
    ];

    const years = [2023, 2024, 2025, 2026, 2027];

    return (
        <div>
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
                <label>Month:</label>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                    <option value="">Select Month</option>
                    {months.map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                </select>
                <label>Year:</label>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                    <option value="">Select Year</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div>
              
                <div>
                    <h5 style={{ color: 'blue' }}>Student ID: {studentId}</h5>
                    <h5 style={{ color: 'blue' }}>Student Name: {studentName}</h5>
                    <h5 style={{ color: 'blue' }}>Year/Class: {studentYear}</h5>
                </div>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '2px solid black', padding: '8px' }}>Date</th>
                            <th style={{ border: '2px solid black', padding: '8px' }}>Attendance</th>
                            <th style={{ border: '2px solid black', padding: '8px' }}>Topic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map(record => (
                            <tr key={record.id}>
                                <td style={{ border: '2px solid black', padding: '8px' }}>{formatDate(record.date)}</td>
                                <td style={{ border: '2px solid black', padding: '8px', color: record.present ? 'green' : 'red' }}>
                                    {record.present ? 'Present' : 'Absent'}
                                </td>
                                <td style={{ border: '2px solid black', padding: '8px' }}>{record.topic}</td>
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
