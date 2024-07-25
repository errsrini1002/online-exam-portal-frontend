import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { config } from '../ConsantsFile/Constants';
const url = config.url.BASE_URL;

function QuestionNavigator() {

    let navigate = useNavigate();
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [year, setYear] = useState('');
  const [testNo, setTestNo] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const fetchQuestions = async () => {
    try {
      //  fetch(url +'/exam/question/addQuestion',
     // const response = await fetch(url + `/questions/getQuestions?year=${year}&testNo=${testNo}`);
      const response = await fetch(url + `/exam/question/getQuestions?year=${year}&testNo=${testNo}`);
      console.log(response); 
      const data = await response.json();
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
  );
}

export default QuestionNavigator;
