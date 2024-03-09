import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback logic here
    const handleOAuthCallback = async () => {
      try {
        // Perform necessary steps to complete OAuth process
        // For example, exchange the authorization code for tokens

        // Redirect to the Thoughts page on successful login
        navigate('/thoughts');
      } catch (error) {
        console.error('OAuth callback error:', error);
        // Handle error or redirect to an error page
      }
    };

    // Call the OAuth callback function
    handleOAuthCallback();
  }, [navigate]);

  return (
    <div>
      <p>Processing OAuth callback...</p>
      {/* You can include a loading spinner or other UI elements */}
    </div>
  );
};

export default OAuthCallback;
