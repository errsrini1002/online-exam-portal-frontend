import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { config } from '../ConsantsFile/Constants';
const url = config.url.BASE_URL;

const StudentTemplate = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const student_jwtToken = sessionStorage.getItem("student-jwtToken");
  const student = JSON.parse(sessionStorage.getItem("active-student"));

  let navigate = useNavigate();
  console.log("Student id");
  console.log(student.id);
  console.log("Student Grade :")
  console.log(student.grade.id); 






  // sending added exam object

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
          <h2>Student Template</h2>
        </div>
       <div className="card-body" style={{ overflowY: "auto" }}>
         
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  
                  <th scope="col">week No</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Homework</th>
                  <th scope="col">Details </th>
                  <th scope="col">Status</th>
                  <th scope="col">percentage Completed</th>
                </tr>
              </thead>

              <tbody>
                
                    <td>
                      <button
                       
                        className="btn btn-sm bg-color custom-bg-text ms-2"
                      >
                        Edit
                      </button>
                    </td>
                 
              </tbody>


            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTemplate;
