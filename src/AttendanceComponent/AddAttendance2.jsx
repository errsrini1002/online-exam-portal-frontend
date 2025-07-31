import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { config } from '../ConsantsFile/Constants';
import { fetchStudents } from './data';
const url = config.url.BASE_URL;

// src/components/AttendanceForm.js


const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

const AttendanceForm = () => {
    const [year, setYear] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [topic, setTopic] = useState('');

      const [gradeId, setGradeId] = useState('');
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
      };




    const handleSubmit = (e) => {
        e.preventDefault();

        students.forEach(student => {
            const attendance = {
                date: date,
                present: student.present,
                studentId: student.id,
                time: time,
                year: gradeId,
                name : student.name, 
                topic: topic,
                             

            };

           console.log(attendance); 
           
              fetch( url + '/attendance/add', {
                method: 'POST',
                headers: {
                  Accept: "application/json",
                "Content-Type": "application/json",
              //  Authorization: "Bearer " + admin_jwtToken,
                },
                body: JSON.stringify(attendance),
              })
              .then(response => response.json())
              .then(data => console.log('Success:', data))
              .catch((error) => console.error('Error:', error));
            });
 
    };

    const handleStudentChange = (id, present) => {
        setStudents(students.map(student => student.id === id ? { ...student, present: present } : student));
    };

     return (
      
       <div>
        <div class="mt-2 d-flex aligns-items-center justify-content-center">
           <div class="form-card border-color" style={{ width: "25rem" }}>
            <div className="container-fluid">
               <div
                 className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
                 style={{
                   borderRadius: "1em",
                   height: "38px",
                 }}
               >
                 <h5 class="card-title">Add Attendance</h5>
              </div>
               <div class="card-body text-color mt-3">
                 <form>
                   <div class="mb-3">
                   
                   <label>Year:</label>
                 {/* <select value={year} onChange={(e) => setYear(e.target.value)}> */}
                 <select value={gradeId} onChange={handleGradeChange}>
                     <option value="">Select Year</option>
                    <option value="Year 4">Year 4</option>
                    <option value="Year 4M">Year 4M</option>
                     <option value="Year 5">Year 5</option>
                     <option value="Year 5M">Year 5M</option>
                   <option value="Year 6">Year 6</option>
                   <option value="Year 7">Year 7</option>
                   <option value="Year 8">Year 8</option>
                   <option value="Year 9">Year 9</option>
                    <option value="Year 10">Year 10</option>
                    <option value="Year 11">Year 11</option>



                </select>

                   </div>
                   <div class="mb-3">
                 <label>Date:</label>
                 <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                   
                   </div>
  
                   <div className="mb-3">
                   <label>Time:</label>
                 <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
  
                   
                 </div>

                 <label for="description" class="form-label">
                    <b>Topic</b>
                  </label>
                  <textarea
                    class="form-control"
                    id="topic"
                    rows="3"
                    placeholder="enter description.."
                    onChange={(e) => {
                      setTopic(e.target.value);
                    }}
                    value={topic}
                  />
                <div></div>

                   <div>
                    <label><h4> Students: </h4></label>
                       {students.map(student => (
                         <div key={student.id}>
                         <span>{student.name}</span>
                        <select value={student.present} onChange={(e) => handleStudentChange(student.id, e.target.value === 'true')}>
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
                       class="btn bg-color custom-bg-text"
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
