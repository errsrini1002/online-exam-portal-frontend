import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from '../ConsantsFile/Constants';

const url = config.url.BASE_URL;

const StudentHomework = () => {
  const [homeworkData, setHomeworkData] = useState([]);
  const student_jwtToken = sessionStorage.getItem("student-jwtToken");
  const student = JSON.parse(sessionStorage.getItem("active-student"));

  let navigate = useNavigate();
  console.log("Student id");
  console.log(student.id);
  console.log("Student Grade :");
  console.log(student.grade.id);

  useEffect(() => {
    fetchHomeworkData();
  }, []);

  const fetchHomeworkData = async () => {
    try {
      // Fetch homework data for the student's grade
      const homeworkResponse = await axios.get(`${url}/hwByGradeId?gradeId=${student.grade.id}`);
      console.log("Homeworks:");
      console.log(homeworkResponse.data);
      const homeworkList = homeworkResponse.data;

      // Fetch additional data for each homework item
      const promises = homeworkList.map(async (hw) => {
        // Fetch week data
        const weekResponse = await axios.get(`${url}/weeks/${hw.weekNumber}`);
        const weekData = weekResponse.data;

        // Try to fetch student homework status
        let studentHwData;
        try {
          const studentHwResponse = await axios.get(`${url}/students_hw/${student.id}/${hw.hwId}`);
          studentHwData = studentHwResponse.data;
        } catch (studentHwError) {
          studentHwData = null; // No record found, so we'll handle this case
        }

        return {
          ...hw,
          startDate: weekData.startDate,
          endDate: weekData.endDate,
          status: studentHwData ? studentHwData.status : "N/A",
          percentageCompleted: studentHwData ? studentHwData.percentageCompleted : "N/A",
        };
      });

      const results = await Promise.all(promises);
      setHomeworkData(results);
    } catch (error) {
      console.error("Error fetching homework data:", error);
    }
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>My Homework</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Week No</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Homework</th>
                  <th scope="col">Details</th>
                  <th scope="col">Status</th>
                  <th scope="col">Percentage Completed</th>
                </tr>
              </thead>
              <tbody>
                {homeworkData.map((hw, index) => (
                  <tr key={index}>
                    <td>{hw.weekNumber}</td>
                    <td>{hw.startDate ? formatDate(hw.startDate) : "N/A"}</td>
                    <td>{hw.endDate ? formatDate(hw.endDate) : "N/A"}</td>
                    <td>{hw.homeWork}</td>
                    <td>{hw.description}</td>
                    <td>{hw.status}</td>
                    <td>{hw.percentageCompleted !== null ? `${hw.percentageCompleted}%` : "N/A"}</td>
                    {/* <td>
                      <button className="btn btn-sm bg-color custom-bg-text ms-2">Edit</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function to format date (yyyy-mm-dd) to dd-mm-yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default StudentHomework;
