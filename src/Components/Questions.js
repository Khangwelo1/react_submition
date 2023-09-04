import React, { useState, useEffect } from 'react';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // State to track if all questions have been answered

  useEffect(() => {
    // Fetch data from the JSON server when the component mounts
    fetch('http://localhost:3001/questions')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  useEffect(() => {
    // Check if all questions have been answered whenever selectedAnswers changes
    const allAnswered = questions.every((question) => selectedAnswers[question.id]);
    setAllQuestionsAnswered(allAnswered);
  }, [questions, selectedAnswers]);

  const handleSubmitAnswers = () => {
    // Check if all questions have been answered before submitting
    if (!allQuestionsAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const answersData = Object.entries(selectedAnswers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    // Send the answers data to the JSON server (update the URL accordingly)
    fetch('http://localhost:3001/submit-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answersData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Answers submitted:', data);
        // You can handle success or show a confirmation message here
      })
      .catch((error) => {
        console.error('Error submitting answers:', error);
        // Handle the error, show an error message, or implement retry logic
      });
  };

  return (
    <div className="Questions">
      <h1>Question Section</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.Question}
            <div>
              <label>
                <input
                  type="radio"
                  name={`answer_${question.id}`}
                  value="agree"
                  onChange={() => handleAnswerChange(question.id, 'agree')}
                  checked={selectedAnswers[question.id] === 'agree'}
                />
                Agree
              </label>
              <label>
                <input
                  type="radio"
                  name={`answer_${question.id}`}
                  value="disagree"
                  onChange={() => handleAnswerChange(question.id, 'disagree')}
                  checked={selectedAnswers[question.id] === 'disagree'}
                />
                Disagree
              </label>
              <label>
                <input
                  type="radio"
                  name={`answer_${question.id}`}
                  value="neutral"
                  onChange={() => handleAnswerChange(question.id, 'neutral')}
                  checked={selectedAnswers[question.id] === 'neutral'}
                />
                Neutral
              </label>
            </div>
          </li>
        ))}
      </ul>

      {questions.length === 0 && <p>No questions available.</p>}
      <button type="button" onClick={handleSubmitAnswers} disabled={!allQuestionsAnswered}>
        Submit Answers
      </button>
    </div>
  );
}

export default Questions;
