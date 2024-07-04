import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { config } from '../ConsantsFile/Constants';
const url = config.url.BASE_URL;

const ViewAllStudentExamResults = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const teacher_jwtToken = sessionStorage.getItem("teacher-jwtToken");
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  let navigate = useNavigate();

  useEffect(() => {
    const getAllResults = async () => {
      const allResults = await retrieveAllExamResults();
      if (allResults) {
        setResults(allResults.results);
      }
    };

    getAllResults();
  }, []);

  const retrieveAllExamResults = async () => {
    const response = await axios.get(
      url + "/exam/result/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const viewExamResult = (result) => {
    navigate("/exam/student/result", { state: result });
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  // Months array for dropdown
  const months = [
    { value: 1, name: 'Jan' },
    { value: 2, name: 'Feb' },
    { value: 3, name: 'Mar' },
    { value: 4, name: 'Apr' },
    { value: 5, name: 'May' },
    { value: 6, name: 'Jun' },
    { value: 7, name: 'Jul' },
    { value: 8, name: 'Aug' },
    { value: 9, name: 'Sep' },
    { value: 10, name: 'Oct' },
    { value: 11, name: 'Nov' },
    { value: 12, name: 'Dec' }
  ];

  // Filtered results based on search term, month and year
  const filteredResults = results.filter(result => {
    const resultDate = new Date(Number(result.exam.startTime));
    const matchesSearchTerm = result.exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.exam.grade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.exam.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.resultStatus.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMonth = selectedMonth ? (resultDate.getMonth() + 1) === parseInt(selectedMonth) : true;
    const matchesYear = selectedYear ? resultDate.getFullYear() === parseInt(selectedYear) : true;

    return matchesSearchTerm && matchesMonth && matchesYear;
  });

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "45rem" }}>
        <div className="card-header custom-bg-text text-center bg-color" style={{ borderRadius: "1em", height: "50px" }}>
          <h2>Students Exam Results</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-2"
          />
          <div className="row mb-2">
            <div className="col">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="form-control"
              >
                <option value="">Select Month</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.name}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="form-control"
              >
                <option value="">Select Year</option>
                {Array.from(new Set(results.map(result => new Date(Number(result.exam.startTime)).getFullYear()))).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Exam</th>
                  <th scope="col">Student</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Marks Obtained</th>
                  <th scope="col">Maximum Marks</th>
                  <th scope="col">Percentage</th>
                  <th scope="col">Submitted time</th>
                  <th scope="col">Result</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result, index) => (
                  <tr key={index}>
                    <td><b>{result.exam.name}</b></td>
                    <td><b>{result.student.firstName} {result.student.lastName}</b></td>
                    <td><b>{result.exam.grade.name}</b></td>
                    <td><b>{result.exam.course.name}</b></td>
                    <td><b>{result.totalCorrectAnswers}</b></td>
                    <td><b>{result.totalMarks}</b></td>
                    <td><b>{result.percentage}</b></td>
                    <td><b>{formatDateFromEpoch(result.exam.startTime)}</b></td>
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

export default ViewAllStudentExamResults;
