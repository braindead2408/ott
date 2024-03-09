// Login.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Login = () => {
  const handleManualRedirect = () => {
    // Replace with your Google OAuth client ID and redirect URI
    const clientId = '849787679221-tlfe3gul6qm02htfkoaubn14td4jfeuv.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000/auth/callback';

    // Construct the Google OAuth URL
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile&prompt=consent`;

    try {
      // Perform the manual redirect in the same window
      window.location.href = authUrl;
    } catch (error) {
      console.error('Login Failed', error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h2 className="mb-4">Login Page</h2>
        <button className="btn btn-primary" onClick={handleManualRedirect}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
