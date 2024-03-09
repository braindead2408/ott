// Thoughts.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Thoughts = () => {
  const [thought, setThought] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Make API request to backend to store 'thought' securely
      const response = await fetch('http://localhost:5000/api/thoughts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thought }),
      });

      if (response.ok) {
        console.log('Thought submitted successfully');
        // Navigate to the ThoughtsFeed page after submitting thought
        navigate('/thoughts/feed');
      } else {
        console.error('Failed to submit thought');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="custom-form">
        <h2 className="text-center mb-4">Overthinker's App</h2>
        <textarea
          className="form-control mb-3"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder="Write your thoughts here..."
        ></textarea>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Thoughts;
