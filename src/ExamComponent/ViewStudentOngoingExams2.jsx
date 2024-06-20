import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { config } from '../ConsantsFile/Constants';
const url = config.url.BASE_URL;

const ViewStudentOngoingExams = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const student_jwtToken = sessionStorage.getItem("student-jwtToken");
  const student = JSON.parse(sessionStorage.getItem("active-student"));

  let navigate = useNavigate();

  useEffect(() => {
    const getAllExams = async () => {
      const allExams = await retrieveAllExams(student.grade.id);
      if (allExams) {
        setExams(allExams.exams);
      }
    };

    getAllExams();
  }, []);

  const retrieveAllExams = async (gradeId) => {
    const response = await axios.get(
      url + "/exam/fetch/grade-wise/ongoing?gradeId=" +
        student.grade.id +
        "&role=Student&studentId=" +
        student.id
    );
    console.log(response.data);
    return response.data;
  };

  const attemptExam = (exam) => {
    console.warn(exam);
  // navigate("/exam/student/attempt", { state: exam });

  {console.log('EXAM OBJECT')}
  {console.log(exam)}; 

  {console.log('Trying to fetch exam in Ongoing Exams ')}
  {console.log(exam.examType)}; 

 
  // Determine which view to render based on the variableValue
  switch (exam.examType) {
    case 'Multiple':
      navigate("/exam/student/attempt", { state: exam });
      break;
    case 'Spell':
      navigate("/exam/student/attemptSpell", { state: exam });
      break;
    case 'Blanks':
      navigate("/exam/student/attemptBlanks", { state: exam });
      break;
    case 'Match':
      navigate("/exam/student/attemptSpell", { state: exam });
      break;
    default:
      navigate("/exam/student/attempt", { state: exam });
  }

  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };


   // Filtered results based on search term
   const filteredResults = results.filter(result =>
    result.exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.exam.grade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.exam.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.resultStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
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
          <h2>Ongoing Exams</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Exam</th>
                  <th scope="col">Course</th>
                  <th scope="col">Duration (mins)</th>
                  <th scope="col">Exam Type</th>
                  
                  {/* <th scope="col">Exam Scheduled</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>

             <tbody>
                {filteredResults.map((exam, index) => (
                  <tr key={index}>
                    <td><b>{exam.name}</b></td>
                    <td><b>{exam.grade.name}</b></td>
                    <td><b>{exam.course.name}</b></td>
                    <td><b>{ formatDateFromEpoch(result.dateTime)}</b></td>
                
                    <td>
                      <b className={result.resultStatus === "Pass" ? "text-success" : "text-danger"}>
                        {result.resultStatus}
                      </b>
                    </td>
                    <td>
                      <button
                        onClick={() => viewExamResult(result)}
                        className="btn btn-sm bg-color custom-bg-text ms-2"
                      >
                        View Result
                      </button>
                    </td>
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

export default ViewStudentOngoingExams;
