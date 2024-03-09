// In your App.js or wherever you define your routes
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login';
import Thoughts from './Thoughts';
import ThoughtsFeed from './ThoughtsFeed'; // Import the ThoughtsFeed component
import OAuthCallback from './OAuthCallback'; // This is where you handle the OAuth callback

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/thoughts/feed" element={<ThoughtsFeed />} /> {/* Add a new route for ThoughtsFeed */}
        <Route path="/auth/callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
