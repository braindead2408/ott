// ThoughtsFeed.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

const ThoughtsFeed = () => {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    // Fetch thoughts from the backend when the component mounts
    fetchThoughts();
  }, []);

  const fetchThoughts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/thoughts');
      if (response.ok) {
        const data = await response.json();
        setThoughts(data.thoughts);
      } else {
        console.error('Failed to fetch thoughts');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="custom-form">
        <h2 className="text-center mb-4">Thoughts Feed</h2>
        <ul className="list-group">
          {thoughts.map((thought) => (
            <li key={thought._id} className="list-group-item">
              <strong>{thought.user.username}:</strong> {thought.text}
              <span className="float-right">{new Date(thought.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThoughtsFeed;
