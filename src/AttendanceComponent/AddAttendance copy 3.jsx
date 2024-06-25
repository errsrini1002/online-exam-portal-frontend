import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { config } from '../ConsantsFile/Constants';
import { fetchStudents } from './data';
const url = config.url.BASE_URL;

const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

// ADD ATTENDANCE 

const AttendanceForm = () => {
    const [year, setYear] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [topic, setTopic] = useState('');

    const [gradeId, setGradeId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        const loadStudents = async () => {
            if (gradeId) {
                const students = await fetchStudents(gradeId);
                setStudents(students);
                const initialAttendance = students.reduce((acc, student) => {
                    acc[student.id] = 'present';
                    return acc;
                }, {});
                setAttendance(initialAttendance);
            }
        };
        loadStudents();
    }, [gradeId]);

    const handleGradeChange = (event) => {
        setGradeId(event.target.value);
        setStudentId(''); // Reset individual student selection
    };

    const handleStudentKeyPress = async (event) => {
        if (event.key === 'Enter') {
            const studentId = event.target.value;
            if (studentId) {
                const student = await fetchStudents(studentId);
                if (student.length > 0) {
                    setStudents(student);
                    const initialAttendance = student.reduce((acc, student) => {
                        acc[student.id] = 'present';
                        return acc;
                    }, {});
                    setAttendance(initialAttendance);
                } else {
                    toast.error("Student not found");
                }
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        students.forEach(student => {
            const attendanceData = {
                date: date,
                present: attendance[student.id],
                studentId: student.id,
                time: time,
                year: gradeId || student.year,
                name: student.name,
                topic: topic,
            };

            console.log(attendanceData);

            fetch(url + '/attendance/add', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    // Authorization: "Bearer " + admin_jwtToken,
                },
                body: JSON.stringify(attendanceData),
            })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch((error) => console.error('Error:', error));
        });
    };

    const handleAttendanceChange = (id, present) => {
        setAttendance({
            ...attendance,
            [id]: present
        });
    };

    return (
        <div>
            <div className="mt-2 d-flex aligns-items-center justify-content-center">
                <div className="form-card border-color" style={{ width: "25rem" }}>
                    <div className="container-fluid">
                        <div
                            className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
                            style={{
                                borderRadius: "1em",
                                height: "38px",
                            }}
                        >
                            <h5 className="card-title">Add Attendance</h5>
                        </div>
                        <div className="card-body text-color mt-3">
                            <form>
                                <div className="mb-3">
                                    <label>Year:</label>
                                    <select value={gradeId} onChange={handleGradeChange}>
                                        <option value="">Select Year</option>
                                        <option value="Year 4">Year 4</option>
                                        <option value="Year 5">Year 5</option>
                                        <option value="Year 6">Year 6</option>
                                        <option value="GCSE">GCSE</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label>Student ID:</label>
                                    <input
                                        type="text"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        onKeyPress={handleStudentKeyPress}
                                        placeholder="Enter Student ID and press Enter"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Date:</label>
                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label>Time:</label>
                                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                                </div>

                                <label htmlFor="topic" className="form-label">
                                    <b>Topic</b>
                                </label>
                                <textarea
                                    className="form-control"
                                    id="topic"
                                    rows="3"
                                    placeholder="Enter description.."
                                    onChange={(e) => setTopic(e.target.value)}
                                    value={topic}
                                />
                                <div></div>

                                <div>
                                    <label><h4>Students:</h4></label>
                                    {students.map(student => (
                                        <div key={student.id}>
                                            <span>{student.name}</span>
                                            <select value={attendance[student.id]} onChange={(e) => handleAttendanceChange(student.id, e.target.value === 'true')}>
                                                <option value="false">Absent</option>
                                                <option value="true">Present</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex aligns-items-center justify-content-center mb-2">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="btn bg-color custom-bg-text"
                                    >
                                        Submit
                                    </button>
                                </div>

                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceForm;
