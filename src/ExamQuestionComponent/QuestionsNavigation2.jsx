import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../ConsantsFile/Constants';
import { useNavigate } from "react-router-dom";



const url = config.url.BASE_URL;

const QuestionsNavigation = () => {
    const [studentId, setStudentId] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [studentYear, setStudentYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

    let navigate = useNavigate();
        const [year, setYear] = useState('');
        const [testNo, setTestNo] = useState('');
        const [questions, setQuestions] = useState([]);
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    
        const fetchQuestions = async () => {
            try {
                const response = await fetch(url + `/exam/question/getQuestions?year=${year}&testNo=${testNo}`);
                const data = await response.json();
                console.log("Fetched data:", data);
    
                setQuestions(data);
                setCurrentQuestionIndex(0);
                setAnsweredQuestions(new Set());
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
    
        const handleAnswer = (index) => {
            setAnsweredQuestions(new Set(answeredQuestions).add(index));
        };
    
        const navigateToQuestion = (index) => {
            setCurrentQuestionIndex(index);
        };

    return (
        <div>
           
            <div>
              
                <div>
                    <h5 style={{ color: 'blue' }}>Student ID: {studentId}</h5>
                    <h5 style={{ color: 'blue' }}>Student Name: {studentName}</h5>
                    <h5 style={{ color: 'blue' }}>Year/Class: {studentYear}</h5>
                </div>
               
            </div>
            <ToastContainer />

            <div>
                <div>
                    <label>Year:</label>
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
                    <label>Test No:</label>
                    <input type="text" value={testNo} onChange={(e) => setTestNo(e.target.value)} />
                    <button onClick={fetchQuestions}>Fetch Questions</button>
                </div>
                <div>
                    <button onClick={() => navigateToQuestion(0)} disabled={questions.length === 0}>Start</button>
                    <button onClick={() => navigateToQuestion(Math.max(0, currentQuestionIndex - 1))} disabled={questions.length === 0}>Previous</button>
                    <button onClick={() => navigateToQuestion(Math.min(questions.length - 1, currentQuestionIndex + 1))} disabled={questions.length === 0}>Next</button>
                    <button onClick={() => navigateToQuestion(questions.length - 1)} disabled={questions.length === 0}>Last</button>
                </div>
                <div>
                    {questions.length > 0 && (
                        <div>
                            <h3>Question {currentQuestionIndex + 1}</h3>
                            <p>{questions[currentQuestionIndex].description}</p>
                            {questions[currentQuestionIndex].image && (
                                <img src={`data:image/jpeg;base64,${questions[currentQuestionIndex].image}`} alt="Question" style={{ maxWidth: '100%', height: 'auto' }} />
                            )}
                            <div>
                                <button onClick={() => handleAnswer(currentQuestionIndex)}>Mark as Answered</button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <h3>Questions</h3>
                    {questions.map((question, index) => (
                        <button
                            key={index}
                            onClick={() => navigateToQuestion(index)}
                            style={{ backgroundColor: answeredQuestions.has(index) ? 'green' : 'white' }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>


        </div>
    );

};

export default QuestionsNavigation;
