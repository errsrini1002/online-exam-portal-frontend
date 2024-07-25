import React, { useState, useEffect } from 'react';
import './SubjectSelector.css';
import PDFViewer from './PDFViewer';
import { ToastContainer, toast } from "react-toastify";
import { config } from '../ConsantsFile/Constants';

const url = config.url.BASE_URL;

const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
const student = JSON.parse(sessionStorage.getItem("active-student"));

const SubjectSelector = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    console.log(student.id); 
    console.log(student.grade.id); 
    console.log(student);
    let gradeId = student.grade.id; 
    console.log(gradeId); 
    fetch(url + `/subjects/${gradeId}`)
      .then(response => response.json())
      .then(data => setSubjects(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error fetching subjects:', error));
  }, []);

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSelectedSubject(subjectId);
    setSelectedTopic('');
    setSelectedSubtopic('');
    fetch(url + `/topics/${subjectId}`)
      .then(response => response.json())
      .then(data => setTopics(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error fetching topics:', error));
  };

  const handleTopicChange = (e) => {
    const topicId = e.target.value;
    setSelectedTopic(topicId);
    setSelectedSubtopic('');
    fetch(url + `/subtopics/${topicId}`)
      .then(response => response.json())
      .then(data => setSubtopics(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error fetching subtopics:', error));
  };

  const handleSubtopicChange = (e) => {
    setSelectedSubtopic(e.target.value);
  };

  const renderTopics = () => {
    if (!selectedSubject) return null;
    return (
      <select value={selectedTopic} onChange={handleTopicChange}>
        <option value="">Select Topic</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>
    );
  };

  const renderSubtopics = () => {
    if (!selectedTopic) return null;
    return (
      <select value={selectedSubtopic} onChange={handleSubtopicChange}>
        <option value="">Select Subtopic</option>
        {subtopics.map((subtopic) => (
          <option key={subtopic.id} value={subtopic.id}>
            {subtopic.name}
          </option>
        ))}
      </select>
    );
  };

  const renderPDF = () => {
    const selectedSubtopicObject = subtopics.find(subtopic => subtopic.id === Number(selectedSubtopic));
    console.log('render method called'); 
    console.log(selectedSubtopicObject); 
    if (selectedSubtopicObject && selectedSubtopicObject.filePath) {
      return <PDFViewer file={selectedSubtopicObject.filePath} />;
    }
    return <PDFViewer file="/WordsList1.pdf" />; // Default PDF if no subtopic selected
  };

  return (
    <div className="subject-selector">
      <div className="dropdowns">
        <select value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        {renderTopics()}
        {renderSubtopics()}
      </div>
      <div className="pdf-viewer">
        {selectedSubtopic && renderPDF()}
      </div>
    </div>
  );
};

export default SubjectSelector;
