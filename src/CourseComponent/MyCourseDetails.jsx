import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { config } from '../ConsantsFile/Constants';
const url = config.url.BASE_URL;

function MyCourseDetails() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const student_jwtToken = sessionStorage.getItem("student-jwtToken");
  const student = JSON.parse(sessionStorage.getItem("active-student"));

  let navigate = useNavigate();
  console.log("Student id:", student.id);
  console.log("Student Grade:", student.grade.id, student.grade.name);

  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState("");
  const [chapterStatuses, setChapterStatuses] = useState({});

  useEffect(() => {
    console.log(url + `/course/details/${student.grade.name}`);
    fetch(url + `/course/details/${student.grade.name}`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleCourseChange = (event) => {
    const contentId = event.target.value;
    setSelectedContentId(contentId);

    if (contentId) {
      fetch(url + `/course/${contentId}/chapters`)
        .then((response) => response.json())
        .then((data) => {
          setChapters(data);
        })
        .catch((error) => console.error("Error fetching chapters:", error));
    } else {
      setChapters([]);
    }
  };

  const fetchChapterStatus = (chapterId) => {
    const contentId = selectedContentId;
    const studentId = student.id;

    fetch(url +`/student/progress/status?studentId=${studentId}&contentId=${contentId}&chapterId=${chapterId}`, {
      headers: {
        'Authorization': `Bearer ${student_jwtToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      // Add status and remarks for each chapter into the state
      setChapterStatuses((prevStatuses) => ({
        ...prevStatuses,
        [chapterId]: { status: data.status, remarks: data.remarks }
      }));
    })
    .catch((error) => console.error("Error fetching chapter status:", error));
  };

  return (
    <div className="course-chapters-container">
      <h1 className="title">Course Chapters</h1>
      <select onChange={handleCourseChange} value={selectedContentId} className="dropdown">
        <option value="">Select a course</option>
        {Array.isArray(courses) && courses.map((course) => (
          <option key={course.contentId} value={course.contentId}>
            {course.subject} - {course.year}
          </option>
        ))}
      </select>

      <table className="course-table">
        <thead>
          <tr>
            {/* <th>Chapter ID</th> */}
             <th>S.No</th>
            <th>Chapter</th>
            <th>Topics</th>
            <th>Status</th>
            <th>Remarks</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter, index) => (
            <tr key={chapter.chapterId}>
              {/* <td>{chapter.chapterId}</td> */}
              <td>{index + 1}</td> {/* Sno column */}
              <td>{chapter.chapter}</td>
              <td>{chapter.topics}</td>
              <td>{chapterStatuses[chapter.chapterId]?.status || 'Not Available'}</td> {/* Display status */}
              <td>{chapterStatuses[chapter.chapterId]?.remarks || 'None'}</td> {/* Display remarks */}
              {/* <td> */}
                {/* <button onClick={() => fetchChapterStatus(chapter.chapterId)}>Get Status</button>  */}
                {/* Fetch status for the selected chapter */}
              {/* </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyCourseDetails;
