import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { config } from '../ConsantsFile/Constants';
const url = config.url.BASE_URL;


function MyCourseDetails() {

  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const student_jwtToken = sessionStorage.getItem("student-jwtToken");
  const student = JSON.parse(sessionStorage.getItem("active-student"));

  let navigate = useNavigate();
  console.log("Student id");
  console.log(student.id);
  console.log("Student Grade :")
  console.log(student.grade.id); 
  console.log(student.grade.name); 


  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState("");

  useEffect(() => {
    //fetch("http://localhost:8080/api/courses/details")
    //fetch(url + `/course/details`)
    console.log(url + `/course/details/${student.grade.name}`); 
 
    fetch(url + `/course/details/${student.grade.name}`)
      .then((response) => response.json())
      .then((data) => {


        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleCourseChange = (event) => {
    const contentId = event.target.value;
    setSelectedContentId(contentId);

    if (contentId) {
      //fetch(`http://localhost:8080/api/courses/${contentId}/chapters`)
      fetch(url + `/course/${contentId}/chapters`)
        .then((response) => response.json())
        .then((data) => {
          setChapters(data);
        })
        .catch((error) => {
          console.error("Error fetching chapters:", error);
        });
    } else {
      setChapters([]);
    }
  };

  return (
    <div className="course-chapters-container">
      <h1 className="title">Course Chapters</h1>
      <select onChange={handleCourseChange} value={selectedContentId} className="dropdown">
        <option value="">Select a course</option>
        {Array.isArray(courses) && courses.map((course) => (
          <option key={course.contentId} value={course.contentId}>
            {/* {course.contentId} - {course.subject} - {course.year} */}
            {course.subject} - {course.year}
          </option>
        ))}
      </select>

      <table className="course-table">
        <thead>
          <tr>
            <th>Chapter ID</th>
            <th>Chapter</th>
            <th>Topics</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr key={chapter.chapterId}>
              <td>{chapter.chapterId}</td>
              <td>{chapter.chapter}</td>
              <td>{chapter.topics}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyCourseDetails;
