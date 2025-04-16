import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../ConsantsFile/Constants';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const url = config.url.BASE_URL;

const QuestionsNavigation2 = () => {
    const [year, setYear] = useState('');
    const [testNo, setTestNo] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Map());
    const [showAnswers, setShowAnswers] = useState(false);
    const [score, setScore] = useState(null);
    const location = useLocation();
    const exam = location.state;

    const fetchQuestions = async () => {

         console.log('exam object ', exam); 
         console.log('exam name ', exam.name); 
        
        try {
          //  const response = await fetch(`${url}/exam/question/getQuestions?year=${year}&testNo=${testNo}`);
            const response = await fetch(`${url}/exam/question/getQuestions?year=${exam.grade.name}&testNo=${exam.name}`);
            const data = await response.json();
            console.log("Fetched data:", data);

            setQuestions(data);
            setCurrentQuestionIndex(0);
            setAnsweredQuestions(new Map());
            setScore(null);
            setShowAnswers(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswer = (index, answer) => {
        const newAnswers = new Map(answeredQuestions);
        newAnswers.set(index, answer);
        setAnsweredQuestions(newAnswers);
    };

    const calculateScore = () => {
        let correctCount = 0;
        questions.forEach((q, index) => {
            if (answeredQuestions.get(index) === q.answer) {
                correctCount++;
            }
        });
        setScore(correctCount);
    };

    const getButtonColor = (index) => {
        if (score !== null) {
            if (!answeredQuestions.has(index)) return 'yellow';
            return answeredQuestions.get(index) === questions[index].answer ? 'green' : 'red';
        }
        return answeredQuestions.has(index) ? 'white' : 'yellow';
    };

    return (
        <div>
            <ToastContainer />
            <div>
                {/* <label>Year:</label>
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
                <label>Test No:</label>
                <input type="text" value={testNo} onChange={(e) => setTestNo(e.target.value)} /> */}
                <h3> Year : {exam.grade.name}</h3>
                <br></br>
                <h3> Test Name:  {exam.name} </h3>
                <button onClick={fetchQuestions}>START EXAM</button>
            </div>
            
            {questions.length > 0 && (
                <>
                    <div>
                        <h3>Question {currentQuestionIndex + 1}</h3>
                        <p>{questions[currentQuestionIndex].description}</p>
                        {questions[currentQuestionIndex].image && (
                            <img src={`data:image/jpeg;base64,${questions[currentQuestionIndex].image}`} alt="Question" style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                        <div style={{ display: 'flex', gap: '70px' }}>
                            {['A', 'B', 'C', 'D', 'E'].map(option => (
                                <label key={option}>
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestionIndex}`}
                                        value={option}
                                        checked={answeredQuestions.get(currentQuestionIndex) === option}
                                        onChange={() => handleAnswer(currentQuestionIndex, option)}
                                    /> {option}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3>Questions</h3>
                        {questions.map((_, index) => (
                            <button key={index} onClick={() => setCurrentQuestionIndex(index)} style={{ backgroundColor: getButtonColor(index), width: '70px' }}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div>
                        <br></br>
                        <br></br>
                        <button  onClick={() => { calculateScore(); }}>Complete Exam</button>&nbsp;&nbsp;
                        <button onClick={() => setShowAnswers(true)}>Show Answers</button>
                    </div>
                    {score !== null && <h3>Your Score: {score} / {questions.length}</h3>}
                    {showAnswers && (
                        <div>
                            <h3>Answers</h3>
                            <table border="1" style={{ borderCollapse: 'collapse', width: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid black', padding: '5px' }}>Q No.</th>
                                        <th style={{ border: '1px solid black', padding: '5px' }}>Your Answer</th>
                                        <th style={{ border: '1px solid black', padding: '5px' }}>Correct Answer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions.map((q, index) => (
                                        <tr key={index}>
                                            <td style={{ border: '1px solid black', padding: '5px' }}>{index + 1}</td>
                                            <td style={{ border: '1px solid black', padding: '5px' }}>{answeredQuestions.get(index) || 'Not Attempted'}</td>
                                            <td style={{ border: '1px solid black', padding: '5px' }}>{q.answer}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuestionsNavigation2;
