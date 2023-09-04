import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Add() {
  const { register, handleSubmit, reset } = useForm();
  const [submittedQuestion, setSubmittedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null); // State to track the edited question
  const [editedValue, setEditedValue] = useState(''); // State to store edited question temporarily

  useEffect(() => {
    // Fetch questions from the server when the component mounts
    axios.get('http://localhost:3001/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const onSubmit = (data) => {
    // Send the question to the server
    axios.post('http://localhost:3001/questions', { Question: data.Question })
      .then(response => {
        // Set the submitted question to be displayed
        setSubmittedQuestion(data.Question);

        // Clear the form
        reset();

        // Update the list of questions by fetching from the server again
        return axios.get('http://localhost:3001/questions');
      })
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error submitting question:', error);
      });
  };

  const deleteQuestion = (id) => {
    // Send a DELETE request to remove the question by its ID
    axios.delete(`http://localhost:3001/questions/${id}`)
      .then(response => {
        // Update the list of questions by fetching from the server again
        return axios.get('http://localhost:3001/questions');
      })
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error deleting question:', error);
      });
  };

  const handleEdit = (question) => {
    // Set the question to be edited and its initial value
    setEditingQuestion(question);
    setEditedValue(question.Question);
  };

  const handleSaveEdit = () => {
    if (editingQuestion) {
      // Send a PUT request to update the question on the server
      axios.put(`http://localhost:3001/questions/${editingQuestion.id}`, { Question: editedValue })
        .then(response => {
          // Reset editing state
          setEditingQuestion(null);
          setEditedValue('');

          // Update the list of questions by fetching from the server again
          return axios.get('http://localhost:3001/questions');
        })
        .then(response => {
          setQuestions(response.data);
        })
        .catch(error => {
          console.error('Error saving edit:', error);
        });
    }
  };

  return (
    <div>
      <div class="form-container" onSubmit={handleSubmit(onSubmit)}>
        <form class="form">
          <div class="form-group">
            <label for="textarea">How Can We Help You?</label>
            <textarea name="textarea" id="textarea" rows="10" cols="50" {...register("Question")}></textarea>
          </div>
          <button class="form-submit-btn" type="submit">Submit</button>
        </form>
      </div>

      {/* Display the submitted question if available */}
      {submittedQuestion && (
        <div>
          <h2>Submitted Question:</h2>
          <p>{submittedQuestion}</p>
        </div>
      )}

      {/* Display the list of questions from the server */}
      <div>
        <h2>Questions:</h2>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              {question === editingQuestion ? (
                <div>
                  <input
                    type="text"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                </div>
              ) : (
                <div>
                  {question.Question}
                  <button onClick={() => handleEdit(question)}>Edit</button>
                  <button onClick={() => deleteQuestion(question.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Add;
