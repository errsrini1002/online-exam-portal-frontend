import "./App1.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./Start"; 
import Timer from "./Timer"; 
import Trivia from "./Trivia"; 

function Kbc() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState(0);
  const [highlight, setHighlight] = useState([]);

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of Harry Potter in the movie?",
      answers: [
        {
          text: "Johnny Depp",
          correct: false,
        },
        {
          text: "Leonardo DiCaprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Radcliffe",
          correct: true,
        },
      ],
    },
    // Add more questions up to 15
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "£ 100" },
        { id: 2, amount: "£ 100" },
        { id: 3, amount: "£ 100" },
        { id: 4, amount: "£ 100" },
        { id: 5, amount: "£ 100" },
        { id: 6, amount: "£ 100" },
        { id: 7, amount: "£ 100" },
        { id: 8, amount: "£ 100" },
        { id: 9, amount: "£ 100" },
        { id: 10, amount: "£ 100" },
        { id: 11, amount: "£ 100" },
        { id: 12, amount: "£ 100" },
        { id: 13, amount: "£ 100" },
        { id: 14, amount: "£ 100" },
        { id: 15, amount: "£ 100" },
      ].reverse(),
    []
  );

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: £{earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setEarned={setEarned}
                    setHighlight={setHighlight}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => {
                const highlightItem = highlight.find(h => h.number === m.id);
                const className = highlightItem ? (highlightItem.correct ? "moneyListItem correct" : "moneyListItem wrong") : "moneyListItem";

                return (
                  <li
                    key={m.id}
                    className={questionNumber === m.id ? `${className} active` : className}
                  >
                    <span className="moneyListItemNumber">{m.id}</span>
                    <span className="moneyListItemAmount">{m.amount}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Kbc;
