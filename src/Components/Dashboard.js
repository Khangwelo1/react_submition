import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  // Counting number of Questions
  const [questionsCount, setQuestionsCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/questions')
      .then((response) => {
        setQuestionsCount(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  // Counting answer statistics
  const [answerStats, setAnswerStats] = useState({
    agree: 0,
    neutral: 0,
    disagree: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:3001/submit-answers')
      .then((response) => {
        const answers = response.data.flat(); // Flatten the nested array
        const stats = {
          agree: 0,
          neutral: 0,
          disagree: 0,
        };

        answers.forEach((answer) => {
          switch (answer.answer) {
            case "agree":
              stats.agree++;
              break;
            case "neutral":
              stats.neutral++;
              break;
            case "disagree":
              stats.disagree++;
              break;
            default:
              break;
          }
        });

        setAnswerStats(stats);
      })
      .catch((error) => {
        console.error('Error fetching answer data:', error);
      });
  }, []);

  return (
    <div className="Dashboard">
      <div className="card">
        <div className="tools">
          <div className="circle">
            <span className="red box"></span>
          </div>
          <div className="circle">
            <span className="yellow box"></span>
          </div>
          <div className="circle">
            <span className="green box"></span>
          </div>
        </div>
        <div className="card__content">
          <h1>{questionsCount}</h1>
          <p>Total Questions</p>
        </div>
      </div>

      <div className="card">
        <div className="tools">
          <div className="circle">
            <span className="red box"></span>
          </div>
          <div className="circle">
            <span className="yellow box"></span>
          </div>
          <div className="circle">
            <span className="green box"></span>
          </div>
        </div>
        <div className="card__content">
          <h1>{answerStats.agree}</h1>
          <p>Agree</p>
        </div>
      </div>

      <div className="card">
        <div className="tools">
          <div className="circle">
            <span className="red box"></span>
          </div>
          <div className="circle">
            <span className="yellow box"></span>
          </div>
          <div className="circle">
            <span className="green box"></span>
          </div>
        </div>
        <div className="card__content">
          <h1>{answerStats.neutral}</h1>
          <p>Neutral</p>
        </div>
      </div>

      <div className="card">
        <div className="tools">
          <div className="circle">
            <span className="red box"></span>
          </div>
          <div className="circle">
            <span className="yellow box"></span>
          </div>
          <div className="circle">
            <span className="green box"></span>
          </div>
        </div>
        <div className="card__content">
          <h1>{answerStats.disagree}</h1>
          <p>Disagree</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
